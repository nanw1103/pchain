
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
