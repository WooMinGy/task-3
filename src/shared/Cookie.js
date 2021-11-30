const getCookie = (name) => {
  let value = "; " + document.cookie;
  // 다른 잡다한 쿠키가 없는경우중 내가 가져오려는 쿠키가 맨 앞에 있어 앞에 ;(세미콜론)이 없을때 값을 가져오기 위해 "; " + 를 해준다.

  let parts = value.split(`; ${name}=`);
  // 세미콜론에 이름을 붙여준다 -> ; user_id= 으로 문자열을 자르는 것!
  // 예시 -> aa = xx;(내가필요없는 쿠키) user_id=aaa; 일때 ; user_id= 로 자르게 되면 [aa=xx, aaa; asdf=asdf(또 다른쿠키가 있는경우)] 이렇게 나뉘게 되는데,
  // 첫번째 필요없는 쿠키를 버리고 그 뒤에 요소중 ;(세미콜론)을 기준으로 또 잘라서 앞의 aaa(내가 필요한 쿠키의 value)만 편하게 가져올 수 있다.

  if (parts.length === 2) {
    // 우리가 찾는 쿠키가 없는경우 위와같이 split으로 쪼갠다 하면 쿠키가 요소 2개의 배열로 쪼개지지 않을 것이다. 그래서 배열의 길이가 2일 경우에만 작동할 수 있게 if문을 사용해 걸러준다.
    return parts.pop().split(";").shift();

    // pop()은 배열의 마지막 부분을 반환, 예를 들면 위에서 나뉜 저 값중 aaa; asdf=asdf(또 다른 쿠키)를 반환해준다.
    // shift()는 반대로 앞 부분 반환해준다. 내가 필요한 aaa 를 가져오기 위해 사용
  }
};

const setCookie = (name, value, exp = 5) => {
  // 여기서 exp=5로 지정할 수 있는데 이는 exp라는 인수를 받아오지 않아도 기본값으로 5를 사용하게 할 수 있다.

  let date = new Date();
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000); // 만료일 만큼의 날짜를 만들어준다

  document.cookie = `${name}=${value}; expires=${date.toUTCString()}`;
};

const deleteCookie = (name) => {
  let date = new Date("2020-01-01").toUTCString();

  console.log(date);

  document.cookie = name + "=; expires=" + date;
};

export { getCookie, setCookie, deleteCookie };
