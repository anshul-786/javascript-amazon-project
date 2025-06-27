const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
  console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev/greeting');
xhr.send();

fetch('https://supersimplebackend.dev/greeting').then((response) => {
  response.text().then((data) => {
    console.log(data);
  })
});

async function getGreeting() {
  const response = await fetch('https://supersimplebackend.dev/greeting');
  const data = await response.text();
  console.log(data);
}

getGreeting();

async function getCustomGreeting() {
  const response = await fetch('https://supersimplebackend.dev/greeting', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'Anshul'
    })
  });

  const data = await response.text();

  console.log(data);
}

getCustomGreeting();

// async function getAmazonData() {
//   try {
//     const response = await fetch('https://amazon.com');
//   } catch(error) {
//     console.log(error);
//   }
// }

// getAmazonData();

async function greetingErrorTest() {
  const response = await fetch('https://supersimplebackend.dev/greeting', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.status >= 400) {
    try {
      throw response;
    } catch(error) {
      if (error.status === 400) {
        console.log(await error.json());
      } else {
        console.log('Network error. Please try again later.');
      }
    }
    
  } else {
    const data = await response.text();
    console.log(data);
  }
}

greetingErrorTest();