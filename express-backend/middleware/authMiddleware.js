
// const authorizeRoles = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ 
//         success: false, 
//         message: `Role (${req.user.role}) is not allowed to access this resource` 
//       });
//     }
//     next();
//   };
// };

//export default  { authorizeRoles };