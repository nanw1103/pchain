pchain
==========================

pchain is a lightweight nodejs module. It chains the execution of multiple Promises, return a promise which 
rejects on the first rejection, or resolves when the last Promise is resolved.

Example
------------------------------------------
Chain promises:

    var pchain = require('pchain');

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
	
    function step1() {
        return new Promise((resolve, reject) => {
            console.log('step1');
            resolve('result from step 1');
        });
    }

    function step2(data) {
        return new Promise((resolve, reject) => {
            console.log('step2. Data:', data);
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


  
A parameter can also be specified for the first step function:

    pchain([
        step1,
        step2
    ], 'Parameter for the first step').then((data) => {
        ...
    }).catch((err) => {
        ...
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
