let token;
let idClient;
let did;
let didId = [];
let didName = [];
let callApiId;





/*////////////////////Получение токена//////////////////*/

	  (function () {
	  const status = response => {
	    if (response.status !== 200) {
	      return Promise.reject(new Error(response.statusText))	
	    }
	      return Promise.resolve(response)
	    }
	      const json = response => {
	      return response.json()
	    }


	  fetch('https://apiproxy.telphin.ru/oauth/token', {
	    method: 'post',

	    body:'grant_type=' + encodeURIComponent('client_credentials') +
	    '&client_id=' + encodeURIComponent('{client_id}') + 
	    '&client_secret=' + encodeURIComponent('{client_secret}'),

	    headers: {
	        'content-type': 'application/x-www-form-urlencoded'
	    }
	  })
	    .then(status)
	    .then(json)
	    .then(data => {

	      token = data.access_token;
	      return token;
	      
	    })
	    .catch(error => {
	      console.log('error', error);
	    })
	}())





/*////////////////////Получение client ID//////////////////*/

function info() {

   const status = response => {
    if (response.status !== 200) {
      return Promise.reject(new Error(response.statusText))	
    }
      return Promise.resolve(response)
    }
      const json = response => {
      return response.json()
    }

  fetch('https://apiproxy.telphin.ru/api/ver1.0/user/', {
    method: 'get',

    headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization':'Bearer ' + token
    }
  })
    .then(status)
    .then(json)
    .then(data => {

      idClient = data.client_id;
      console.log(data);
      return idClient;
    })
    .catch(error => {
      console.log('error', error);
    })
}





/*////////////////////Создать добавочный//////////////////*/

function createExt() {

 const status = response => {
    if (response.status !== 201) {
      return Promise.reject(new Error(response.statusText))	
    }
      return Promise.resolve(response)
    }
      const json = response => {

      return response.json()
    }


  fetch('https://apiproxy.telphin.ru/api/ver1.0/client/'+ idClient + '/extension/', {
    method: 'post',

    body: JSON.stringify({

    	type: 'phone',
	name: '999'
    }),

    headers: {
        'Content-type': 'application/json',
        'Authorization':'Bearer ' + token
    }
  })
    .then(status)
    .then(json)
    .then(data => {

    	console.log('created', data.name);

    })
    .catch(error => {
      console.log('error', error);
    })
}




/*////////////////////Вывести список добавочных//////////////////*/

function extList() {

     const status = response => {
    if (response.status !== 200) {
      return Promise.reject(new Error(response.statusText))	
    }
      return Promise.resolve(response)
    }
      const json = response => {
      return response.json()
    }

  fetch('https://apiproxy.telphin.ru/api/ver1.0/client/'+ idClient + '/extension/', {
    method: 'get',

    headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization':'Bearer ' + token
    }
  })
    .then(status)
    .then(json)
    .then(data => {
    	console.log(data);
    })
    .catch(error => {
      console.log('error', error);
    })
}





/*////////////////////Обратный звонок//////////////////*/

function callback() {

  let input = document.getElementById('num').value;

     const status = response => {
    if (response.status !== 201) {
      return Promise.reject(new Error(response.statusText))	
    }
      return Promise.resolve(response)
    }
      const json = response => {

      return response.json()
    }


  fetch('https://apiproxy.telphin.ru:443/api/ver1.0/extension/233089/callback/', {
    method: 'post',

    body: JSON.stringify({

	"allow_public_transfer": true,

	"dst_num": "{dst_num}",

	"src_num": [
		{src_num}
  		],
  	"transfer_after_dst_hangup": "{transfer_after_dst_hangup}",

  	"caller_id_name": input,
  	
  	"caller_id_number": input,

  	"wait_for_pickup": 30
 		
}),

    headers: {
        'Content-type': 'application/json',
        'Authorization':'Bearer ' + token
    }
  })
    .then(status)
    .then(json)
    .then(data => {
    	console.log('call_api_id:', data.call_api_id);
    	callApiId = data.call_api_id;
    	return callApiId;

    })
    .catch(error => {
      console.log('error', error);
    })
} 




/*////////////////////Получить текущий звонок//////////////////*/
function currentCalls() {

  const status = response => {
    if (response.status !== 200) {
      return Promise.reject(new Error(response.statusText))	
    }
      return Promise.resolve(response)
    }
      const json = response => {
      return response.json()
    }

  fetch('https://apiproxy.telphin.ru/api/ver1.0/extension/233085/current_calls/'+callApiId, {
    method: 'get',

    headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization':'Bearer ' + token
    }
  })
    .then(status)
    .then(json)
    .then(data => {
    	console.log(data);
    })
    .catch(error => {
      console.log('error', error);
    })
}




/*////////////////////Получить список DID//////////////////*/
function didlist() {

  const status = response => {
    if (response.status !== 200) {
      return Promise.reject(new Error(response.statusText))	
    }
      return Promise.resolve(response)
    }
      const json = response => {
      return response.json()
    }

  fetch('https://apiproxy.telphin.ru/api/ver1.0/client/'+ idClient + '/did/', {
    method: 'get',

    headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization':'Bearer ' + token
    }
  })
    .then(status)
    .then(json)
    .then(data => {

    	did = data;

    	did.forEach(function(item, i, arr) {

      	for (key in item) {

        	if(key == 'id') {

         		didId.push(item[key]);

        	} else if(key == 'name') {

          		didName.push(item[key]);
        	}
        
     	 }
      	return [didId, didName];
    });

    console.log(didId);
    console.log(didName);

    })
    .catch(error => {
      console.log('error', error);
    })
}



/*////////////////////Получить cdr за текущий день//////////////////*/
function callHistory() {

  let thisDay = new Date();
  let thisDate = thisDay.getUTCDate();
  let thisYear = thisDay.getUTCFullYear();
  let thisMonth = thisDay.getUTCMonth() + 1;

  const status = response => {
    if (response.status !== 200) {
      return Promise.reject(new Error(response.statusText))	
    }
      return Promise.resolve(response)
    }
      const json = response => {
      return response.json()
    }

  fetch('https://apiproxy.telphin.ru/api/ver1.0/client/'+ idClient + '/call_history/?start_datetime='+ thisYear + '-' + thisMonth + '-' + thisDate + '%2000%3A00%3A00&end_datetime='+ thisYear + '-' + thisMonth + '-' + thisDate + '%2023%3A59%3A59', {
    method: 'get',

    headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization':'Bearer ' + token
    }
  })
    .then(status)
    .then(json)
    .then(data => {
    	console.log(data.call_history);
    })
    .catch(error => {
      console.log('error', error);
    })
}





/*////////////////////Получить общую статистику за текущий день//////////////////*/
function callStats() {

  let thisDay = new Date();
  let thisDate = thisDay.getUTCDate();
  let thisYear = thisDay.getUTCFullYear();
  let thisMonth = thisDay.getUTCMonth() + 1;
  let inputStats = document.getElementById('stats');

  	const status = response => {
    if (response.status !== 200) {
      return Promise.reject(new Error(response.statusText))	
    }
      return Promise.resolve(response)
    }
      const json = response => {
      return response.json()
    }

  fetch('https://apiproxy.telphin.ru/api/ver1.0/client/'+ idClient + '/calls/stats/?start_datetime='+ thisYear + '-' + thisMonth + '-' + thisDate + '%2000%3A00%3A00&end_datetime='+ thisYear + '-' + thisMonth + '-' + thisDate + '%2023%3A59%3A59', {
    method: 'get',

    headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization':'Bearer ' + token
    }
  })
    .then(status)
    .then(json)
    .then(data => {
        console.log('in:', data.in);
        console.log('out:', data.out);

    	let stats = data;

	  	for (key in stats) {

	  		if (key == 'in') {

	  			let inCalls = stats[key];

	  				for (key in inCalls) {

	  					if (key == 'total') {

	  						let total = inCalls[key];
	  						document.getElementById('statsIn').value = 'Входящие: ' + total;
	  					}
	  				}

	  			

	  		} else if (key == 'out') {

	  			let outCalls = stats[key];

	  				for (key in outCalls) {

	  					if (key == 'total') {

	  						let total = outCalls[key];

	  						document.getElementById('statsOut').value = 'Исходящие: ' + total;
	  					}
	  				}
	  		}
	  		
	    }  	
    })
    .catch(error => {
      console.log('error', error);
    })
  	
}
