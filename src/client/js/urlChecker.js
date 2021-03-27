const checkForUrl = (formUrl) => {
  let res = formUrl.match(/^http:\/\/|^https:\/\//i);
  if (res == null) {
    alert('Please enter a URL');
    return false;
  } else {
    return true;
  }
};

export { checkForUrl };
