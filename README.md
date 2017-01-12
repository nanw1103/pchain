pchain
==========================

pchain is a lightweight nodejs module. It chains the execution of multiple Promises, return a promise which 
rejects on any rejection and resolves when the last given Promise is resolved.

Example
------------------------------------------
Chain promises:

  var pchain = require('pchain');

  function step1() {
    return new Promise((resolve, reject) => {
      console.log('step1');
      resolve('result from step 1');
	});
  }
  function step2(data) {
    return new Promise((resolve, reject) => {
        console.log('step2. Data from previous step:', data);
        resolve();
    });
  }
  function step3() {
    return new Promise((resolve, reject) => {
      console.log('step3: Random resolve or reject');
      if (Date.now() % 2)
        resolve();
      else
        reject('unlucky');
    });
  }
  function step4() {
    return new Promise((resolve, reject) => {
      console.log('step4');
      resolve("I'm lucky");
    });
  }

  pchain([
    step1,
    step2,
    step3,
    step4
  ]).then((data) => {
    console.log('All set:', data);
  }).catch((err) => {
    console.log('Demo something wrong:', err);
  });

The elements in the input task array can be either functions which generate Promise objects, or Promise objects directly:

  pchain([
    step1(),
    step3()
  ]).then((data) => {
    ...
  }).catch((err) => {
    ...
  });
  
If the first element is a function, parameter for that function can be specified:

  pchain([
    step1,
    step2
  ], 'Parameter for the first step').then((data) => {
    ...
  }).catch((err) => {
    ...
  });
  
  