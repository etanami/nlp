function handleSubmit(event) {
  event.preventDefault();

  // check what link was put into the form field
  let formUrl = document.getElementById('url').value;

  //Checks first for valid URL then post route to server for API call
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

//function to update the UI with the results of the analysis
async function updateUI(res) {
  console.log(res);

  //Find and name HTML elements
  const confidenceEl = document.getElementById('confidence');
  const subjectivityEl = document.getElementById('subjectivity');
  const polarityEl = document.getElementById('polarity');
  const agreementEl = document.getElementById('agreement');

  // Gets API information and updates UI
  confidenceEl.innerHTML =
    'The feeling of confidence is ' + res.confidence + '%';
  subjectivityEl.innerHTML = 'The article is ' + res.subjectivity;
  polarityEl.innerHTML = `The tone is ${scoreTag(res.score_tag)}`;
  agreementEl.innerHTML = 'There is ' + res.agreement + ' within the tone';
}

//returns the type of tone analyzed by the api
export const scoreTag = (score_tag) => {
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
    return 'Non Sentimental';
  }
};

export { handleSubmit };
