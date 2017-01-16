pchain
==========================

pchain ensures execution sequence of multiple Promises, return a promise which 
rejects on the first rejection, or resolves when the last Promise is resolved. 

Also, resolved data from a step is passed to the next step function as input parameter.

Example
------------------------------------------
Chain promises, or functions which return promise. Resolved data from a Promise will be passed to next step as function parameter, if the next step is a function:

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


  
If any value is not a function but an object, it will be pased to the next step as parameter as well:

    pchain([
		'Parameter for the next step',
        step1,
        step2
    ]).then((data) => {
        ...
    }).catch((err) => {
        ...
    });
  

Enable verbose debug:

    pchain.debug();
	
or

    pchain = require('pchain').debug();

A chain name can be specified to the chain, for easier debug purpose:

    var pchain = require('pchain').debug();

    pchain([
        step1,
        step2,
        pchain.sleep(2000),	//utility to sleep
        'Hello, mortal',	//non-promise will be passed as parameter to next step
        step3,		
        new Promise(resolve => {	//bare promise can be used as well.
            resolve();
        }),
        step5,
        step6

    ], 'Demo sequence').then((data) => {
        console.log('All set:', data);

    }).catch((err) => {
        console.log('Demo something wrong:', err);
    });


    function step1() {
        return new Promise(resolve => {
            resolve('result from step 1');
        });
    }

    function step2(data) {
        return new Promise((resolve, reject) => {
            console.log('step2 - get data from previous step: ' + data);
            resolve();
        });
    }

    function step3(data) {
        return new Promise((resolve, reject) => {
            console.log('step3 - get data const: ' + data);
            resolve();
        });
    }

    function step5() {
        return new Promise((resolve, reject) => {
            console.log('step5 - Random resolve or reject');

            if (Date.now() % 2)
                resolve();
            else
                reject('unlucky');
        });
    }

    function step6() {
        return new Promise((resolve, reject) => {
            resolve("I'm lucky");
        });
    }
