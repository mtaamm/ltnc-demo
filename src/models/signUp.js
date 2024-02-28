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

const signUpFunc = async (username, password) => {
    console.log(username, password)
    try {
        var usernameExists = await checkUsernameExists(username);
        if (usernameExists) {
            console.log('Username already exists.')
            return 'nameExisted'
        } else {
            if (password!='') {
                const data = {
                    name: username,
                    password: password,
                    role: 'user'
                }
                const docRef = await db.collection('users').add(data);
                return 'success'
            } else {
                console.log('Invalid Password.')
                return 'invalidPass'
            }
        }
    } catch (error) {
        console.error('Error:', error);
        return 'err'
    }
}

module.exports = signUpFunc