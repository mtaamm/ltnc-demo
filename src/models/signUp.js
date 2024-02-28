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
        if (username==''||password=='') {
            console.log('Invalid Username or Password.')
            return 'invalidNameOrPass'
        } else {
            var usernameExists = await checkUsernameExists(username);
            if (usernameExists) {
                console.log('Username already exists.')
                return 'nameExisted'
            } else {
                const data = {
                    name: username,
                    password: password,
                    role: 'user'
                }
                const docRef = await db.collection('users').add(data);
                return 'success'
            }
        }
    } catch (error) {
        console.error('Error:', error);
        return 'err'
    }
}

module.exports = signUpFunc