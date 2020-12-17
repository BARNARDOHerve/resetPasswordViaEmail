import jwt from 'jsonwebtoken';
import UserService from '../services/user';
import mailer from '../utils/mailer';

class UserController {
  static async resetPassword(req, res) {
    try {
      const { email } = req.body;
      // const user = UserService.findUser(email);
      // if(!user) return res.status(404).json({ error: 'User not found.' });
      const token = jwt.sign(email, 'barnardo');
      const emailStatus = await mailer(['reset-password', {
        email,
        resetBody: `${process.env.HOST}/users/password/new?token=${token}`
      }, email
      ]);
      if (emailStatus) return res.status(500).json({ error: 'error' });
      return res.status(200).json({ Message: 'Go to this link to rest your password' });
    } catch (error) {
      return res.status(500).json({ Message: 'error' });
    }
  }
}
export default UserController;
