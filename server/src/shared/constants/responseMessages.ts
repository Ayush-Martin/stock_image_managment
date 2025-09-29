export enum AuthResponseMessage {
  // Error messages
  EmailExists = "User with email already exists",
  OtpNotFound = "OTP is generated cannot reset",
  OtpExpired = "OTP is expired",
  InvalidOtp = "Invalid OTP",
  OtpNotVerified = "OTP is not verified",
  InvalidCredentials = "Invalid credentials",
  UserBlocked = "Blocked",
  InvalidRefreshToken = "Invalid refresh token",
  InvalidAccessToken = "Invalid token",
  NoAccess = "You have no access",
  InvalidCurrentPassword = "Current password is invalid",
  UserNotFound = "User not found",

  // Success messages
  OTPResent = "OTP resent",
  RegisterOtpSent = "OTP sent to your email, verify to complete registration",
  UserRegistered = "New user created",
  UserLoggedIn = "Login successful",
  UserLoggedOut = "User is logged out",
  ForgetPasswordOtpSent = "OTP sent to your email, verify to reset password",
  OtpVerified = "OTP is verified",
  PasswordReset = "Password is updated",
  TokenRefreshed = "Token refreshed",
}

export enum ImageResponseMessage {
  //Error messages
  NoImagesUploaded = "No images uploaded",
  ImageNotFound = "Image not found",

  //Success messages
  ImageUploaded = "Image uploaded successfully",
  ImagesUploaded = "Images uploaded successfully",
  ImageTitleUpdated = "Image title updated successfully",
  ImageUpdated = "Image updated successfully",
  ImageDeleted = "Image deleted successfully",
  ImageRearranged = "Image rearranged successfully",
  ImagesFetched = "Images fetched successfully",
}
