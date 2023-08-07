const errMsg = document.getElementById('errMsg'); 
        const inputID= document.getElementsByName('inputId');
        const inputPW= document.getElementsByName('inputPw');
        const login= document.getElementsByName('loginButton');
        
        if(iputID !='id' || inputPW!='pw'){
            login.addEventListener('click',()=>{
                
                errMsg.setAttribute('display','block')
            })

        }

        


        // addEventListener.
        // document.getElementById('errMsg').setAttribute('display', 'block'); 