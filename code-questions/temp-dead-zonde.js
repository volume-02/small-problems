function tdz() {
    try {
        let x = 4;
        if (true) {
            console.log('x_let:', x);
            let x = 5;
        }
    } catch (err) {
        console.log('x_let:error');
    }

    try {
        const y = 4;
        if (true) {
            const y = 5;
            console.log('y_const_1:', y);
        }
        console.log('y_const_2:', y);
    } catch (err) {
        console.log('y_const_1:error');
    }

    console.log('outer-var: ', z);
    try {
        var z = 4;
        if (true) {
            var z = 5;
            console.log('z_var_1:', z);
        }
        console.log('z_var_2:', z);
    } catch (err) {
        console.log('y_var_1:error');
    }
}

tdz();
