;(function(){
  // 创建双向链表类
  function DoubleLinkedList(){
    this.length = 0;
    this.head = null;
    this.tail = null;
  };

  DoubleLinkedList.prototype = {
    //链表尾部追加元素方法
    append : function(element){
      //1 根据新元素创建节点
      var newNode = new Node(element);
      //2 判断原来链表是否为空
      if(this.head === null){
        this.head = newNode;
        this.tail = newNode;
      }else{
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
      }
      //3 链表长度加1
      this.length++;
    },

    // 插入
    insert : function(position,element){
      //1 检测边界问题：越界插入失败
      if(position < 0 || position > this.length) return false;
      //2 定义变量，保存信息
      var newNode = new Node(element);
      //3 判断是否是在链表第一个位置插入
      if(position === 0){
        // 判断链表是否为空
        if(this.head === null){
          this.head = newNode;
          this.tail = newNode;
        }else{
          this.head.prev = newNode;
          newNode.next = this.head;
          this.head = newNode;
        }
      }else if(position === this.length){
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
      }else {
        // 定义属性
        var index = 0;
        var current = this.head;
        var previous = null;
        // 查找正确的位置
        while(index++ < position){
          previous = current;
          current = current.next;
        }
        // 交换节点指向顺序
        newNode.next = current;
        newNode.prev = previous;
        current.prev = newNode;
        previous.next = newNode;
      }
      //4 .length+1;
      this.length++;
      return true;
    },

    // 移除节点
    removeAt : function(position){
      //1 检测越界问题：越界移除失败，返回null
      if(position < 0 || position >= this.length) return null;
      //2 判断移除的位置
      var current = this.head;
      if(position === 0){
        if(this.length === 1){
          this.head = null;
          this.tail = null;
        }else{
          this.head = this.head.next;
          this.head.prev = null
        }
      }else if(position === this.length - 1){
        current = this.tail;
        this.tail = this.tail.prev;
        this.tail.next = null;
      }else{
        var index = 0;
        var previous = null;
        while(index++ < position){
          previous = current;
          current = current.next;
        }
        previous.next = current.next;
        current.next.prev = previous;
      }
      //3 .length - 1
      this.length--;
      return current.element;
    },

    // 根据元素获取链表中的位置
    indexOf : function(){
      //1 定义变量保存信息
      var current = this.head;
      var index = 0;
      //2 查找正确的信息
      while(current){
        if(current.element === element){
          return index;
        }
        index++;
        current = current.next
      }
      //3 来到这个位置，说明没有找到，返回-1
      return -1;
    },

    // 根据元素删除信息
    remove : function(element){
      var index = this.indexOf(element);
      return this.removeAt(index);
    },

    // 判断链表是否为空
    isEmpty : function(){
      return this.length === 0;
    },

    // 获取链表的长度
    size : function(){
      return this.length;
    },

    // 获取第一个节点
    getHead : function(){
      return this.head.element;
    },

    // 获取最后一个节点
    getTail : function(){
      return this.tail.element;
    },

    // 正向遍历的方法
    forwardString : function(){
      var current = this.head;
      var forwardStr = '';
      while(current){
        forwardStr += ',' + current.element;
        current = current.next;
      }
      return forwardStr.slice(1)
    },

    // 反向遍历
    reverseString : function(){
      var current = this.tail;
      var reverseStr = '';
      while(current){
        reverseStr += ',' + current.element;
        current = current.prev;
      }
      return reverseStr.slice(1);
    },

    // 实现toString方法
    toString : function(){
      return this.forwardString();
    }
  }

  // 节点类
  function Node(element){
    this.element = element;
    this.prev = null;
    this.next = null;
  };

  var list = new DoubleLinkedList();

  // 追加元素
  list.append('abc');
  list.append('def');
  list.append('ghi');
  // console.log(list);

  // // 获取所有的遍历结果
  // console.log(list.forwardString());  // abc,def,ghi
  // console.log(list.reverseString());  // ghi,def,abc
  // console.log(list.toString());       // abc,def,ghi

  // // insert方法测试
  // list.insert(0,'100');
  // list.insert(2,'200');
  // list.insert(3,'300');
  // console.log(list.toString()); // 100,abc,200,300,def,ghi
})()