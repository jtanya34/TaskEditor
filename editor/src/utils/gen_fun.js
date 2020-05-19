import cookie from "react-cookies";

export const setCookie = (cname, cvalue, minutes) => {
  var d = new Date();
  d.setTime(d.getTime() + minutes * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
};

export const getCookie = (name) => {
  let cookies = cookie.loadAll();
  let value = cookies[name];
  return value;
};
