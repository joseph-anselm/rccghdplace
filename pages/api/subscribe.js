import { client } from '@/sanityClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    try {
      await client.create({
        _type: 'emailsubs',
        emailAddress: email,
      });
      return res.status(200).json({ message: 'Subscription successful' });
    } catch (error) {
      console.error('Error submitting email:', error);
      return res.status(500).json({ message: 'Error submitting email' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
