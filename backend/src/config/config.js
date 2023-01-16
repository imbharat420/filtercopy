export const config = {
  VERIFY_EMAIL_EXPIRE_DURATION: 60 * 60, // 1 hour
  FORGET_PASS_OTP_EXPIRE_DURATION: 60 * 10, // 10 min
  OTP_CHARACTERS:
    '0123456789abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',

  USER_SAFE_INFO: '_id username email name avatar settings collections',
  USER_PUBLIC_INFO: '_id name username avatar',
};
