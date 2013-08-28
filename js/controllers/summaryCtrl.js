app.controller("summaryCtrl",function($scope,AJAX){

//    var naved=false;
//    $scope.$on('$pageNaved',function(){
//        if(naved){return}
//        naved=true;
//        var sw1=new myswipe({
//            jqo:document.getElementById('tabcWrap'),
//            actThreshold:1,
//            XThreshold:1,
//            touchEndCall:function(result,dv){
//                alert(result);
//            }
//        });
//    })



    $scope.summary={}

    var getAct=function(index,cb){
        AJAX({
            url: APP_ACTION["summaryURL"]+index,
            cache:true,
            bCall: function () {
                loadingPromp.open("正在获取信息...");
            },
            sCall: function (d) {
                console.log(d);
                if(d.status == "ok" && d.result) {
                    if(angular.isFunction(cb)){
                        cb(index,d.result.content);
                    }
                }else{
                    cb(index,'<div class="alert">看来此页是空的.</div>');
                }


            },
            cCall: function () {
                loadingPromp.close();
            },
            eCall:function(){}
        })
    };
    getAct(1,function(index,content){
        $scope.summary['content'+index]=content;
        $scope.summary.summaryIndex=index;
    });


    $scope.getContent=function(index){
        var changepage=function(i){
            if(i>$scope.summary.summaryIndex){
                $scope.animateType={enter: 'slide2left-enter', leave: 'slide2left-leave'};
            }else{
                $scope.animateType={enter: 'slide2right-enter', leave: 'slide2right-leave'};
            }
            $scope.summary.summaryIndex=i;
        };
        if(!$scope.summary['content'+index]){
            getAct(index,function(index,content){
                $scope.summary['content'+index]=content;
                changepage(index);
            });
        }else{
            changepage(index);
        }



     }
})
