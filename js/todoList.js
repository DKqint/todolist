window.addEventListener('load',function () {
    let title = document.querySelectorAll('.tab>li');
    let contents = document.querySelector('.content');

    let prev =0;
    let todolist =[
        {
            id:1, content:'放假好好睡一觉',ctime:'2019.06.08',status:false
        },
        {
            id:2, content:'放假好好睡两觉',ctime:'2019.06.09',status:false
        },
        {
            id:3, content:'不睡觉',ctime:'2019.06.07',status:true
        },
        {
            id:4, content:'学习',ctime:'2019.06.06',status:true
        }

    ];

    //todolist = localStorage.getItem('todolist') ? JSON.parse(localStorage.getItem('todolist')) : todolist;

    let str = localStorage.getItem('todolist');
    if(!str){
        saveData();
        str = localStorage.getItem('todolist');
    }
    todolist = JSON.parse(str);

    title.forEach((ele,index) => {
        ele.onclick = function () {
            title[prev].classList.remove('hot');
            this.classList.add('hot');
            prev = index;
            type = this.getAttribute('type');

            render(filterdata(type));
        }
    });


    title[0].onclick();



    function  filterdata(type){
        let arr = [];
        switch(type){
            case 'all':
                arr = todolist;
                break;
            case 'done':
                arr = todolist.filter(function (ele) {return ele.status});
                break;
            case 'left':
                arr = todolist.filter(function (ele) {return !ele.status});
                break;
        }

        return arr;
    }
    //////////////////////////添加///////////////////////////////////
    let forms = document.forms[0];
    let input_content = forms.elements['content'];
    let input_submit = forms.elements[1];

    input_submit.onclick = function(e){
        e.preventDefault();
        let obj = createObj();
        todolist.push(obj);
        forms.reset();
        render(filterdata(type));
        saveData();
    };
    ///////////////////////////saveDATA////////////////////////////////////
    function saveData() {
        localStorage.setItem('todolist',JSON.stringify(todolist))
    }




    function createObj(){
        let id = todolist[todolist.length-1].id+1;
        let content = input_content.value;
        let ctime = new Date().toLocaleDateString();
        let status = false;
        return {id,content,ctime,status};
    }
    ///////////////////修改状态///////////////////////////////////
    /*
        视图->数据
        li ->数组元素
        复选框 ->数组元素status (li->id)

     */
contents.onclick = function(e){
    let target = e.target;
    let arr = todolist;
    let id = target.parentNode.id;
    if (target.nodeName === "INPUT") {
        let a = arr.filter(ele=>ele.id == id)[0];
        a.status=target.checked;
    } else if (target.nodeName === "DEL") {
        let index = arr.findIndex(ele => ele.id == id);
        arr.splice(index, 1);
    }
    saveData();
    render(filterdata(type));
 };


    /////////////////渲染/////////////////////////////
//
//     let checkbox = document.querySelectorAll('input[type = checkbox]')
//
//     checkbox.forEach(ele=>{
//         ele.onclick =function () {
//             let id = this.parentNode.id;
//             let arr = todolist.filter(eles=>eles.id==id)[0];
//             arr.status = true;
//         }
//     })
    function render(arr) {
        let html = '';
        arr.forEach(function (elem) {
            if(elem.status){
                html +=`
                    <li id = ${elem.id}>
                        <input type="checkbox" checked> <p>${elem.content}</p> <del>X</del> <time>${elem.ctime}</time>
                    </li>
                `;
            }else{
                html +=`
                <li id = ${elem.id}>
                    <input type="checkbox" > <p>${elem.content}</p> <del>X</del> <time>${elem.ctime}</time>
                </li>
                `;
            }
        });

        contents.innerHTML = html;
    }
})
