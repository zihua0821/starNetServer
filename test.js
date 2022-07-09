var arr = [];
arr.push('111')
arr.push('111')
arr.push('222')
arr.push('333')
// arr = arr.filter(item=>{
//     return item !== '222';
// });



function remove(val){
    arr = arr.filter(item=>{
        return item !== val;
    });  
}

function isExist(val){
    return !!arr.find(e=>e===val);
}

remove('222')
console.log(isExist('11'));
