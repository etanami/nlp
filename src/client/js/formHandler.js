function handleSubmit(event) {
  event.preventDefault();

  // check what link was put into the form field
  let formUrl = document.getElementById('url').value;

  if (Client.checkForUrl(formUrl)) {
    fetch('http://localhost:8081/apiCall', {
      method: 'POST',
      cache: 'no-cache',
      credentials: 'same-origin',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ formUrl }),
    })
      .then((res) => res.json())
      .then((res) => {
        updateUI(res);
        //console.log(res);
      });
    console.log('::: Form Submitted :::');
  } else {
    alert('Please enter a valid Url');
    console.log('Invalid url');
  }
}

async function updateUI(res) {
  console.log(res);
  // Gets API information from the server
  document.getElementById('confidence').innerHTML =
    'The feeling of confidence is ' + res.confidence + '%';
  document.getElementById('subjectivity').innerHTML =
    'The article is ' + res.subjectivity;
  document.getElementById('polarity').innerHTML = `The tone is ${scoreTag(
    res.score_tag
  )}`;
  document.getElementById('agreement').innerHTML =
    'There is ' + res.agreement + ' within the tone';
}

const scoreTag = (score_tag) => {
  if (score_tag === 'P') {
    return 'Positive';
  } else if (score_tag === 'P+') {
    return 'Very Positive';
  } else if (score_tag === 'N') {
    return 'Negative';
  } else if (score_tag === 'N+') {
    return 'Very Negative';
  } else if (score_tag === 'NEU') {
    return 'Neutral';
  } else {
    return '';
  }
};

export { scoreTag };

export { handleSubmit };
