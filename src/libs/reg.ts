//验证密码
export const validatePass = (rule:any,value: any, callback: any,) => {
  var reg = /^[a-zA-Z0-9]{6,20}$/;
  if (!reg.test(value)) {
    callback(new Error("请输入6-20位的数字或字母的密码"));
  } else {
    callback();
  }
};
