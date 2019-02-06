let token = 1;
let idClient;



function newToken() {
	let xhr = new XMLHttpRequest();

	let body = 'grant_type=' + encodeURIComponent('client_credentials') +
  	'&client_id=' + encodeURIComponent("/*client id*/") + 
  	'&client_secret=' + encodeURIComponent("/*client secret*/");

	xhr.open('POST', 'https://apiproxy.telphin.ru/oauth/token', false);

	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.send(body);

  if (xhr.status !== 200) {
    console.log( xhr.status + ': ' + xhr.statusText );
  } else {
    token = JSON.parse(xhr.response)['access_token'];
  }

  return token;
}



function info() {

let xhr = new XMLHttpRequest();
  
  xhr.open('GET', 'https://apiproxy.telphin.ru/api/ver1.0/user/', false);
  xhr.setRequestHeader('Authorization', 'Bearer ' + token); 
  console.log(token);

  xhr.send();

  if (xhr.status !== 200) {
    console.log( xhr.status + ': ' + xhr.statusText );
  } else {
    idClient = JSON.parse(xhr.response)['client_id'];
    console.log(xhr.responseText);	
  }
  return idClient;
}



function createExt() {

	let xhr = new XMLHttpRequest();
	let body = {
		type: 'phone',
		name: '777'
	}
	let str = JSON.stringify(body);

	xhr.open('POST', 'https://apiproxy.telphin.ru/api/ver1.0/client/'+ idClient + '/extension/', false);

	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.setRequestHeader('Authorization', 'Bearer ' + token);

  	xhr.send(str);

  	if (xhr.status !== 200) {
   		console.log( xhr.status + ': ' + xhr.statusText );
  	} else {
    	alert(xhr.responseText);
  	}
}



function extList() {

  let xhr = new XMLHttpRequest();
  
  xhr.open('GET', 'https://apiproxy.telphin.ru/api/ver1.0/client/'+ idClient + '/extension/', false);

  xhr.setRequestHeader('Authorization', 'Bearer ' + token); 

  xhr.send();

  if (xhr.status !== 200) {
    console.log( xhr.status + ': ' + xhr.statusText );
  } else {
    console.log(xhr.responseText);	
  }
}



// function fetchUse() {

//   const status = response => {
//     if (response.status !== 200) {
//       return Promise.reject(new Error(response.statusText))
//     }
//       return Promise.resolve(response)
//     }
//       const json = response => {
//       console.log(response.headers.get('content-type'));
//       return response.json()
//     }


//   fetch('https://apiproxy.telphin.ru/oauth/token', {
//     method: 'post',

//     let body = 'grant_type=' + encodeURIComponent('client_credentials') +
//     '&client_id=' + encodeURIComponent("/*client id*/") + 
//     '&client_secret=' + encodeURIComponent("/*client secret*/"),

//     headers: {
//         'content-type': 'application/x-www-form-urlencoded'
//     }
//   })
//     .then(status)
//     .then(json)
//     .then(data => {
//       console.log('data', data);
//     })
//     .catch(error => {
//       console.log('error', error);
//     })
// }


function callback() {

  let input = document.getElementById('num').value;
  let xhr = new XMLHttpRequest();

  let body = {

    "allow_public_transfer": false,
    "dst_num": "/*ext number*/",
    "src_num": [input],
    "wait_for_pickup": 30
  }

  let str = JSON.stringify(body); 

  xhr.open('POST', 'https://apiproxy.telphin.ru:443/api/ver1.0/extension//*extension id*//callback/', false);

  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);

    xhr.send(str);

    if (xhr.status !== 200) {
      console.log( xhr.status + ': ' + xhr.statusText );
    } else {
      alert(xhr.responseText);
    }
} 

