const { getFirestore} = require('firebase-admin/firestore');
const db = getFirestore();

async function checkUsernameExists(username) {
    try {
      const usersSnapshot = await db.collection('users').where('name', '==', username).get();
      if (usersSnapshot.empty) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error('Error checking username:', error);
      throw new Error('Error checking username');
    }
}
async function checkPassword(username, password) {
    try {
        const usersSnapshot = await db.collection('users').where('name', '==', username).get();
        // Username not found, lỡ lúc check name ở trên có nhưng mà xuống dưới này đang chạy thì thằng admin xóa user:v
        if (usersSnapshot.empty) {
            return {isLogin: false, role: ''}
        } else {
            // Username found, check if the password matches
            const userDoc = usersSnapshot.docs[0];
            const userData = userDoc.data();
            if (userData.password === password) {
                return {isLogin: true, role: userData.role}
            } else {
                return {isLogin: false, role: ''}
            }
        }
    } catch (error) {
        console.error('Error checking password:', error);
        return {isLogin: false, role: ''}
    }
}

async function loginFunc(username, password) {
    if (username==''||password=='') {
        console.log('Invalid Username or Password.')
        return {isLogin: false, role: ''}
    } else {
        var usernameExists = await checkUsernameExists(username)
        if (usernameExists) {
            var checkPassResult = await checkPassword(username, password)
            return checkPassResult
        } else return {isLogin: false, role: ''}
    }
}

module.exports = loginFunc