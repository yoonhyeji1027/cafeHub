import emailjs from 'emailjs-com';

export const sendEmail = async (templateParams) => {
  try {
    const result = await emailjs.send(
      'service_ju8jhjk',
      'template_m87wdv8',
      templateParams,
      'Ve6bFjXhWRZ7xAshS'
    );
    console.log('Email successfully sent:', result.text);
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};
