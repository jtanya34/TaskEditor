import cookie from "react-cookies";

export const setCookie = (cname, cvalue, minutes) => {
  var d = new Date();
  d.setTime(d.getTime() + minutes * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  //cookie.save(cname,cvalue,{expires})
  document.cookie = cname + "=" + cvalue + "; " + expires;
};

export const getCookie = (name) => {
  let cookies = cookie.loadAll();
  let value = cookies[name];
  return value;
};

export const deleteCookie = (name) => {
  document.cookie =
    name +
    "=; domain=" +
    window.location.origin +
    "; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
