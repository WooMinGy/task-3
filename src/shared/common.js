export const emailCheck = (email) => {
  // aa_-.123Aaa@aa.com
  // 이메일 형식 정규식 체크
  let _reg =
    /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;

  return _reg.test(email);
};
