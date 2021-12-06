this.jd = this.jd||{};
(function(){
    var It_4 = function()
    {
        this.init();
    };

    var p = It_4.prototype;
    p.topNum = 5;
    p.showNum = 3;
    p.space = 96.5;

    p.init = function()
    {
        this.initDom();
        this.initLoader();
    };

    p.initDom = function()
    {
        this.canvasContainer = document.getElementById("container3d");
    };

    //====================================================   loader    start ===============================================//
    p.resourcesMap ={};
    p.initLoader = function()
    {
        var cur = this;
        var resourcesAry = [
            {id:"title", type:"texture", url:"static/images/it_4/title.png"},
            {id:"bgLine", type:"texture", url:"static/images/it_4/bgLine.png"},
            {id:"numLine", type:"texture", url:"static/images/it_1/numLine.png"},
            {id:"cuboid", type:"js", url:"static/model/stair.js"},
            {id:"spark", type:"texture", url:"static/images/spark1.png"},
            {id:"sortNum_1", type:"texture", url:"static/images/num/num_1.png"},
            {id:"sortNum_2", type:"texture", url:"static/images/num/num_2.png"},
            {id:"sortNum_3", type:"texture", url:"static/images/num/num_3.png"},
            {id:"sortNum_4", type:"texture", url:"static/images/num/num_4.png"},
            {id:"sortNum_5", type:"texture", url:"static/images/num/num_5.png"}
        ];
        this.loader = new jd.ThreeGroupLoader();
        this.loader.$eventDispatcher.bind('loadProgress',function(e,data){
            //console.log(data);
        });
        this.loader.$eventDispatcher.bind('loadComplete',function(e,data){
            $(".loading").fadeOut();
            //
            cur.resourcesMap = data;
            cur.init3d();
            cur.initData();
        });
        this.loader.load(resourcesAry);
    };
    //====================================================   loader    end =================================================//

    //======================================================   data    start ===================================================//
    p.initData = function()
    {
        var cur = this;
        //var apiUrl =  ["data/it_1.json", "data/it_1_2.json"];
        var apiUrl = "http://data.jd.com/digitalBUData?type=api10_45bf8560_5985_40e9_9cb3_4dfd62efd60e";
        this.dataTool = new jd.DataTool(apiUrl);
        this.dataTool.eventDispatcher.bind("updateData",function(e,ary,sum){
            //scope3["component3"].update(ary);
            cur.dataUpdate(ary,sum);
        });
    };

    p.dataUpdate = function(ary,sum)
    {
        this.logoUpdate(ary);
        this.numItemUpdate(ary);
    };
    //======================================================   data    end ===================================================//


    //======================================================   threejs    start ===================================================//
    /*------------------------------threejs common part start--------------------------------------------*/
     p.init3d=function()
    {
        this.initRender();
        this.initCamera();
        this.initScene();
        this.initObject();
        this.initLight();
        this.initResize();
    };
    p.initRender=function()
    {
        this.renderer = new THREE.WebGLRenderer({ antialias: true ,alpha:true});
        this.renderer.autoClear = false;
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.canvasContainer.appendChild( this.renderer.domElement );
    };

    p.initCamera=function()
    {
        var width = window.innerWidth;
        var height = window.innerHeight;
        this.camera = new THREE.PerspectiveCamera( 20, width / height, 1, 5000 );
        this.camera.position.set(0, 0, 2300);
        //
        this.titleCamera = new THREE.PerspectiveCamera( 48, width / height, 1, 3000 );
        this.titleCamera.position.set(0, 0, 1000);
    };

    p.initScene = function()
    {
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog( 0x000000, 0, 100000 );
        //
        this.titleScene = new THREE.Scene();
    };

    p.initLight = function ()
    {

    };

    p.initObject=function()
    {
        this.initContainer();
        this.createTitle();
        this.createParticleMaterial();
        this.createBox();
        this.boxAppear();
        this.createInnerParticle();
        this.innerParticleAppear();
        this.createBgParticle();
        this.createBgLine();
        this.bgLineAppear();
        this.createNumLine();
        this.numLineAppear();
        this.createSortNum();
        this.sortNumAppear();
        this.createLogo();
        this.createNum();
        this.numAppear();
    };

    p.render = function()
    {
        if(this.renderer)
        {
            //this.container.rotation.y +=0.01;
            this.boxRender();
            this.innerParticleRender();
            this.bgParticleRender();
            this.renderer.render( this.scene, this.camera );
            //
            this.renderer.render( this.titleScene, this.titleCamera );
        }
    };

    p.initResize = function()
    {
        var cur = this;
        window.addEventListener( 'resize', function(){
            cur.resizeFun();
        }, false );
        this.resizeFun();
    };

    p.resizeFun = function()
    {
        var width = window.innerWidth;
        var height = window.innerHeight;
        this.camera.aspect = width/ height;
        this.camera.updateProjectionMatrix();
        this.titleCamera.aspect = width/ height;
        this.titleCamera.updateProjectionMatrix();
        this.renderer.setSize( width, height );
    };
    /*------------------------------threejs common part end--------------------------------------------*/

    p.initContainer = function()
    {
        this.container = new THREE.Object3D();
        this.scene.add(this.container);
        //this.container.rotation.x = 0.2;
    };

    /*-------------------------------------------------- title start--------------------------------------------------*/
    p.createTitle = function()
    {
        var material = new THREE.SpriteMaterial( { map:this.resourcesMap["title"]["result"] } );
        this.title = new THREE.Sprite( material );
        this.titleScene.add(this.title);
        var width = material.map.image.width;
        var height = material.map.image.height;
        this.title.scale.set( width, height, 1 );
        this.title.position.y = 330;
    };
    //
    p.createParticleMaterial = function()
    {
        var texture = this.resourcesMap["spark"]["result"];
        this.particleMaterial = new THREE.ShaderMaterial( {
            uniforms: {
                color:    { type: "c", value: new THREE.Color( 0xffffff ) },
                opacity:  { type: "f", value: 1 },
                texture:  { type: "t", value: texture }
            },
            vertexShader:   document.getElementById( 'vertexshader' ).textContent,
            fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
            blending:       THREE.AdditiveBlending,
            depthTest:      false,
            transparent:    true
        });
    };
    /*-------------------------------------------------- title end--------------------------------------------------*/

    /*------------------------------------------------ box  start --------------------------------------------------*/
    p.createBox = function()
    {
        //this.createBoxGeometry();

        this.boxAry = [];
        this.boxContainer = new THREE.Object3D();
        this.container.add(this.boxContainer);
        //this.boxContainer.position.x = -250;
        this.boxContainer.position.y = -50;
        this.boxContainer.rotation.set(0.7,-0.4,0.4);
        //this.boxContainer.rotation.set(1.4,0,0);
        //
        for(var i =0; i<this.topNum; i++)
        {
            var box = this.createBoxItem(i);
            this.boxContainer.add(box);
            this.boxAry.push(box);
            box.position.x = (i-2)*160+1000;
            box.position.y = -(i-2)*60;
            //box.scale.y = 0;
            box.userData["opacity"] =0;
            box.userData["endX"] =(i-2)*160;
        }
    };

    p.createBoxGeometry = function()
    {
        this.boxGeometry = new THREE.BoxGeometry(200,30,100,40,6,20);
    };

    p.createBoxItem = function(id)
    {
        var vs = this.resourcesMap["cuboid"]["result"].vertices;
        var pointNum = vs.length;
        var geometry = new THREE.BufferGeometry();
        //
        var positionAry = new Float32Array(pointNum*3);
        var colorAry = new Float32Array(pointNum*3);
        var opacityAry = new Float32Array( pointNum );
        var sizeAry = new Float32Array( pointNum );
        var endYAry  = new Float32Array(pointNum);
        //
        var color = new THREE.Color( 0xde3ed4 );
        //
        var i = pointNum;
        var i3 = positionAry.length;
        while(i3>0)
        {
            i--;
            i3 -=3;
            positionAry[i3] = vs[i]["x"]*1.5;
            positionAry[i3+1] = vs[i]["y"]*2;
            positionAry[i3+2] = vs[i]["z"]*1.5;
            //
            opacityAry[i] = 0;
            //opacityAry[i] = 0.5*((positionAry[i3+2]+70)/140)+0.3;
           /* if(id!=0 && positionAry[i3]<0 && positionAry[i3+1]>50)
            {
                opacityAry[i] = 0;
            }*/
            sizeAry[i] = 2*Math.random()+1;;
            color.toArray( colorAry, i * 3 );
            //
            endYAry[i] = vs[i]["y"]*6;
        }
        geometry.addAttribute( 'position', new THREE.BufferAttribute( positionAry, 3 ) );
        geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colorAry, 3 ) );
        geometry.addAttribute( 'customOpacity', new THREE.BufferAttribute( opacityAry, 1 ) );
        geometry.addAttribute( 'size', new THREE.BufferAttribute( sizeAry, 1 ) );
        geometry.addAttribute( 'endY', new THREE.BufferAttribute( endYAry, 1 ) );
        //
        var particles = new THREE.Points( geometry, this.particleMaterial );
        geometry.attributes.position.needsUpdate = true;
        return particles;
    };

    p.boxAppear = function()
    {
        var ary = this.boxAry;
        for(var i = 0; i < ary.length; i++)
        {
            this.boxItemAppear(ary[i],i)
        }
    };

    p.boxItemAppear = function(box,i)
    {
        var delayTime = (this.topNum-i)*0.2;
        //TweenLite.to(box.scale, 1.6, { delay:delayTime, y:1});
        TweenLite.to(box.position, 1.6, { delay:delayTime,x:box.userData["endX"]});
        TweenLite.to(box.userData, 1.5, { delay:delayTime, opacity:1,onCompleteScope:this, onComplete:function(){
            //this.innerParticleItemAry[i].visible = true;
            //this.innerParticleItemAppear(this.innerParticleItemAry[i]);
        }});
    };

    p.boxRender = function()
    {
        var ary = this.boxAry;
        for(var i = 0; i < ary.length; i++)
        {
            this.boxItemRender(ary[i])
        }
    };

    p.boxItemRender = function(box)
    {
        var positionAry = box.geometry.attributes.position.array;
        var opacityAry = box.geometry.attributes.customOpacity.array;
        var i = opacityAry.length;
        var i3 = positionAry.length;
        while(i3>0)
        {
            i--;
            i3 -= 3;
            opacityAry[i]=(0.3*((positionAry[i3+2]+70)/140)+0.7)*box.userData["opacity"];
            //opacityAry[i]=1;
        }
        box.geometry.attributes.position.needsUpdate = true;
        box.geometry.attributes.customOpacity.needsUpdate = true;
    };
    /*-------------------------------------------------- box  end  --------------------------------------------------*/

    /*--------------------------------------------- innerParticle  start  ----------------------------------------------*/
    p.createInnerParticle = function()
    {
        this.innerParticleItemAry =[];
        for(var i =0; i<this.topNum; i++)
        {
            var innerParticle = this.createInnerParticleItem();
            this.boxContainer.add(innerParticle);
            this.innerParticleItemAry.push(innerParticle);
            innerParticle.position.x = (i-2)*160;
            innerParticle.position.y = -(i-2)*60;
            innerParticle.userData["opacity"]= 0;
        }
        //this.boxPContainer.visible =false;
    };

    p.createInnerParticleItem = function()
    {
        var particleNum = 1500;
        var positionAry = new Float32Array(particleNum*3);
        var colorAry = new Float32Array(particleNum*3);
        var vAry = new Float32Array(particleNum*3);
        var opacityAry = new Float32Array( particleNum );
        var sizeAry = new Float32Array( particleNum );
        var color = new THREE.Color( 0xde3ed4 );
        //
        var i = particleNum;
        var i3 = positionAry.length;
        while(i3>0)
        {
            i--;
            i3 -=3;
            positionAry[i3] = 320*(Math.random()-0.5);
            positionAry[i3+1] = 60*Math.random();
            positionAry[i3+2] = 140*(Math.random()-0.5);
            vAry[i3] = (Math.random()-0.5)*0.4;
            vAry[i3+1] = (Math.random()-0.5)*0.1;
            vAry[i3+2] = (Math.random()-0.5)*0.2;
            opacityAry[i] = 0.6*((positionAry[i3+2]+70)/140)+0.1;;
            sizeAry[i] = Math.random()*2+2;
            color.toArray( colorAry, i * 3 );
        }
        var geometry = new THREE.BufferGeometry();
        geometry.addAttribute( 'position', new THREE.BufferAttribute( positionAry, 3 ) );
        geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colorAry, 3 ) );
        geometry.addAttribute( 'v', new THREE.BufferAttribute( vAry, 3 ) );
        geometry.addAttribute( 'customOpacity', new THREE.BufferAttribute( opacityAry, 1 ) );
        geometry.addAttribute( 'size', new THREE.BufferAttribute( sizeAry, 1 ) );
        //
        var particles = new THREE.Points( geometry, this.particleMaterial );
        geometry.attributes.position.needsUpdate = true;
        return particles;
    };

     p.innerParticleAppear = function()
     {
         var ary = this.innerParticleItemAry;
         for(i=0; i<ary.length;i++)
         {
             this.innerParticleItemAppear(ary[i],i)
         }
     };

    p.innerParticleItemAppear = function(innerParticle,i)
    {
        var delayTime = (this.topNum-i)*0.2+1.5;
        //TweenLite.to(innerParticle.scale, 1.6, { delay:delayTime, y:1});
        //TweenLite.to(innerParticle.position, 1.6, { delay:delayTime,x:innerParticle.userData["endX"]});
        TweenLite.to(innerParticle.userData, 1.5, { delay:delayTime, opacity:1,onCompleteScope:this, onComplete:function(){

        }});
    };

    p.innerParticleRender = function()
    {
        var ary = this.innerParticleItemAry;
        for(i=0; i<ary.length;i++)
        {
            this.innerParticleItemRender(ary[i],i);
        }
    };

    p.innerParticleItemRender = function(innerParticle,id)
    {
        var positionAry = innerParticle.geometry.attributes.position.array;
        var vAry = innerParticle.geometry.attributes.v.array;
        var opacityAry = innerParticle.geometry.attributes.customOpacity.array;
        //
        var i = opacityAry.length;
        var i3 = positionAry.length;
        while(i3>0)
        {
            i--;
            i3 -=3;

            opacityAry[i]=(0.3*((positionAry[i3+2]+70)/140)+0.3)*innerParticle.userData["opacity"];
            positionAry[i3] += vAry[i3];
            positionAry[i3+1] += vAry[i3+1];
            //positionAry[i3+2] += vAry[i3+2];
            if(positionAry[i3]<-120)
            {
                positionAry[i3]=-120;
                vAry[i3]=-vAry[i3];
            }
            if(positionAry[i3]>120)
            {
                positionAry[i3]=120;
                vAry[i3]=-vAry[i3];
            }
            //
            if(positionAry[i3+1]<0)
            {
                positionAry[i3+1]=0;
                vAry[i3+1]=-vAry[i3+1];
            }
            if(positionAry[i3+1]>60)
            {
                positionAry[i3+1]=60;
                vAry[i3+1]=-vAry[i3+1];
            }
            if(positionAry[i3+2]<-50)
            {
                positionAry[i3+2]=-50;
                vAry[i3+2]=-vAry[i3+2];
            }
            if(positionAry[i3+2]>50)
            {
                positionAry[i3+2]=50;
                vAry[i3+2]=-vAry[i3+2];
            }
        }
        innerParticle.geometry.attributes.position.needsUpdate = true;
        innerParticle.geometry.attributes.customOpacity.needsUpdate = true;
        innerParticle.geometry.attributes.customColor.needsUpdate = true;
        innerParticle.geometry.attributes.size.needsUpdate = true;
    };
    /*--------------------------------------------- innerParticle  end  ----------------------------------------------*/

    /*---------------------------------------------- bgParticle start-----------------------------------------------*/
    p.createBgParticle = function(id)
    {
        var particleNum = 2500;
        var positionAry = new Float32Array(particleNum*3);
        var vYAry = new Float32Array(particleNum);
        var colorAry = new Float32Array(particleNum*3);
        var opacityAry = new Float32Array( particleNum );
        var sizeAry = new Float32Array( particleNum );

        var color = new THREE.Color( 0xde3ed4 );
        //
        var i = particleNum;
        var i3 = positionAry.length;
        while(i3>0)
        {
            i--;
            i3 -=3;
            //
            positionAry[i3] = 4000*(Math.random()-0.5);
            positionAry[i3+1] = 2000*(Math.random()-0.5);
            positionAry[i3+2] = -5000*(Math.random());
            //
            vYAry[i] = 5*Math.random()+2;
            opacityAry[i] = 0.2+0.5*Math.random();
            sizeAry[i] = 5*Math.random()+2;
            color.toArray( colorAry, i * 3 );
        }
        var geometry = new THREE.BufferGeometry();
        geometry.addAttribute( 'position', new THREE.BufferAttribute( positionAry, 3 ) );
        geometry.addAttribute( 'vY', new THREE.BufferAttribute( vYAry, 1 ) );
        geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colorAry, 3 ) );
        geometry.addAttribute( 'customOpacity', new THREE.BufferAttribute( opacityAry, 1 ) );
        geometry.addAttribute( 'size', new THREE.BufferAttribute( sizeAry, 1 ) );
        //
        geometry.attributes.position.needsUpdate = true;
        geometry.attributes.customOpacity.needsUpdate = true;
        //
        this.bgParticle = new THREE.Points( geometry, this.particleMaterial );
        this.scene.add(this.bgParticle);
    };

    p.bgParticleRender = function()
    {
        var positionAry = this.bgParticle.geometry.attributes.position.array;
        var vY = this.bgParticle.geometry.attributes.vY.array;
        var opacityAry = this.bgParticle.geometry.attributes.customOpacity.array;
        //
        var i = vY.length;
        var i3 = positionAry.length;
        while(i3>0)
        {
            i--;
            i3 -=3;
            positionAry[i3+2] += vY[i];
            if(positionAry[i3+2] > 1000)
            {
                positionAry[i3+2] = -6000;
            }
        }
        this.bgParticle.geometry.attributes.position.needsUpdate = true;
        this.bgParticle.geometry.attributes.customOpacity.needsUpdate = true;
        this.bgParticle.geometry.attributes.customColor.needsUpdate = true;
        this.bgParticle.geometry.attributes.size.needsUpdate = true;
    };
    /*---------------------------------------------- bgParticle end-----------------------------------------------*/

    /*------------------------------------------------- bgLine start-------------------------------------------------*/
    p.createBgLine = function()
    {
        var texture = this.resourcesMap["bgLine"]["result"];
        var w = texture.image.width;
        var h = texture.image.height;
        var geometry = new THREE.PlaneGeometry( w, h, 5,5 );
        var material = new THREE.MeshBasicMaterial( { map: texture,opacity:0/*,alphaMap:map*/, side: THREE.DoubleSide,transparent:true,depthTest:false } );
        this.bgLine = new THREE.Mesh( geometry, material );
        this.container.add( this.bgLine );
        this.bgLine.position.y = -150;
        this.bgLine.rotation.x = 0.6;
    };

    p.bgLineAppear = function()
    {
        TweenLite.to(this.bgLine.material, 2, { delay:1, opacity:1});
    };
    /*------------------------------------------------- bgLine end-------------------------------------------------*/


    /*--------------------------------------------------- numLine start-----------------------------------------------*/
    p.createNumLine = function()
    {
        this.numLineAry =[];
        for(var i=0;i<this.topNum;i++)
        {
            var numLineItem = this.createNumLineItem();
            this.boxContainer.add(numLineItem);
            this.numLineAry.push(numLineItem);
            numLineItem.position.x = (i-2)*160+100;
            numLineItem.position.y = -(i-2)*60+130-50;
            //
            numLineItem.rotation.x = -this.boxContainer.rotation.x;
            numLineItem.rotation.y = -this.boxContainer.rotation.y;
            numLineItem.userData["endY"] = -(i-2)*60+130;
        }
    };

    p.createNumLineItem = function()
    {
        var texture = this.resourcesMap["numLine"]["result"];
        var material = new THREE.MeshBasicMaterial( { map: texture,opacity:0, color:0xde3ed4,transparent:true, /*blending:THREE.AdditiveBlending,*/ depthTest:false} );
        var geometry = new THREE.PlaneGeometry( texture.image.width,texture.image.height );
        var numLine = new THREE.Mesh(geometry,material);
        return numLine;
    };

    p.numLineAppear = function()
    {
        var ary = this.numLineAry;
        for(var i = 0; i<ary.length; i++)
        {
            this.numLineItemAppear(ary[i],i);
        }
    };

    p.numLineItemAppear = function(numLineItem,i)
    {
        var delayTime = 1.5+(this.topNum-i)*0.2;
        TweenLite.to(numLineItem.material, 1, { delay:delayTime, opacity:1});
        TweenLite.to(numLineItem.position, 1, { delay:delayTime,y:numLineItem.userData["endY"]});
    };
    /*--------------------------------------------------- numLine end-----------------------------------------------*/

    /*--------------------------------------------------- sortNum start-----------------------------------------------*/
    p.createSortNum = function()
    {
        this.sortNumAry = [];
        for(var i=0;i<this.topNum;i++)
        {
            var sortNumItem = this.createSortNumItem(i);
            this.boxContainer.add(sortNumItem);
            this.sortNumAry.push(sortNumItem);
            sortNumItem.position.x = (i-2)*200-150;
            sortNumItem.position.y =-(i-2)*30 ;
            sortNumItem.rotation.x = -this.boxContainer.rotation.x;
            sortNumItem.rotation.y = -this.boxContainer.rotation.y;
            sortNumItem.userData["endY"] =-(i-2)*60-100;
        }
    };

    p.createSortNumItem = function(i)
    {
        var str = "sortNum_"+(i+1);
        var texture = this.resourcesMap[str]["result"];
        var material = new THREE.MeshBasicMaterial( { map: texture,opacity:0, color:0xffffff,transparent:true, /*blending:THREE.AdditiveBlending,*/ depthTest:false} );
        var geometry = new THREE.PlaneGeometry( texture.image.width,texture.image.height );
        var sortNumItem = new THREE.Mesh(geometry,material);
        sortNumItem.scale.set(1.1,1.1,1)
        return sortNumItem;
    };

    p.sortNumAppear = function()
    {
        var ary = this.sortNumAry;
        for(var i = 0; i<ary.length; i++)
        {
            this.sortNumItemAppear(ary[i],i);
        }
    };

    p.sortNumItemAppear = function(sortNumItem,i)
    {
        var delayTime = (this.topNum-i)*0.2+2;
        TweenLite.to(sortNumItem.material, 1, { delay:delayTime, opacity:1});
        TweenLite.to(sortNumItem.position, 1, { delay:delayTime,y:sortNumItem.userData["endY"]});
    };
    /*--------------------------------------------------- sortNum end-----------------------------------------------*/

    /*--------------------------------------------------- num start--------------------------------------------------*/
    p.createNum = function()
    {
        this.numItemAry =[];
        this.contextAry =[];
        for(var i=0;i<this.showNum;i++)
        {
            var obj = this.createTxtMaterialItem();
            var numItem = this.createNumItem(obj["material"]);
            this.boxContainer.add(numItem);
            this.numItemAry.push(numItem);
            //numItem.position.x = this.boxAry[i].position.x;
            //numItem.position.y =380;

            numItem.position.x = (i-2)*160+130;
            numItem.position.y = -(i-2)*60+200;
            numItem.rotation.x = -this.boxContainer.rotation.x;
            numItem.rotation.y = -this.boxContainer.rotation.y;
            //
            this.contextAry.push(obj["context"]);
            //console.log(obj["material"].map)
        }
    };

    p.createNumItem = function(material)
    {
        var numItem = new THREE.Mesh( new THREE.PlaneGeometry( 128,32 ), material );
        return numItem
    };

    p.createTxtMaterialItem = function()
    {
        var canvas = document.createElement( 'canvas' );
        canvas.width = 128;
        canvas.height =32;
        var context = canvas.getContext('2d');
        context.shadowBlur=12;
        context.shadowColor="rgba(255,0,0,0.8)";
        context.textAlign ="center";
        context.font = "Bold 20px Arial";
        /*context.fillStyle = "rgba(255,0,0,0.5)";
         context.fillRect(0,0,128,32);*/
        context.fillStyle='#FFFFFF';
        context.fillText("56465654", 64,20);
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        var material = new THREE.MeshBasicMaterial( { map: texture,opacity:0, side: THREE.DoubleSide,transparent:true,depthTest:false } );
        var obj ={"material":material,"context":context};
        return obj;
    };

    p.numItemUpdate = function(ary)
    {
        for(var i=0; i<this.contextAry.length;i++)
        {
            this.contextAry[i].clearRect(0,0,128,32);
            this.contextAry[i].fillText(this.formatNum(ary[i]["num"].toString()), 64,20);
            this.numItemAry[i].material.map.needsUpdate = true;
            //console.log(this.numItemAry[i].material);
        }
    };

    p.formatNum = function(str)
    {
        if (str.length <= 3)
        {
            return str;
        }
        else
        {
            return this.formatNum(str.substr(0, str.length - 3)) + ',' + str.substr(str.length - 3);
        }
    };

    p.numAppear = function()
    {
        var ary = this.numItemAry;
        for(var i = 0; i < ary.length; i++)
        {
            this.numItemAppear(ary[i],i)
        }
    };
    p.numItemAppear = function(numItem,i)
    {
        var delayTime = 1+(this.topNum-i)*0.1;
        TweenLite.to(numItem.material, 1.5, { delay:delayTime, opacity:1,onCompleteScope:this, onComplete:function(){

        }});
    };
    /*---------------------------------------------------- num end--------------------------------------------------*/

    /*-------------------------------------------------- logo start--------------------------------------------------*/
    p.createLogo = function()
    {
        this.logoGeometry = new THREE.PlaneGeometry( 110, 30, 5,5 );
        //
        this.logoContainerAry =[];
        for(var i=0;i<this.topNum;i++)
        {
            var logoContainer = new THREE.Object3D();
            this.boxContainer.add(logoContainer);
            logoContainer.position.x = (i-2)*160+120;
            logoContainer.position.y = -(i-2)*60+175;
            //
            logoContainer.rotation.x = -this.boxContainer.rotation.x;
            logoContainer.rotation.y = -this.boxContainer.rotation.y;
            logoContainer.userData["brandId"] = "_";
            logoContainer.userData["id"]=i;
            this.logoContainerAry.push(logoContainer);
        }
    };

    p.logoUpdate = function(ary)
    {
        for(var i=0; i< this.logoContainerAry.length; i++)
        {
            this.logoItemUpdate(this.logoContainerAry[i],ary[i]);
        }
    };

    p.logoItemUpdate = function(container,obj)
    {
        if(container.userData["brandId"] != obj["brand_id"])
        {
            container.userData["brandId"] = obj["brand_id"];
            this.removeLogoItem(container);
            this.addLogoItem(container,obj);
        }
    };

    p.addLogoItem = function(container,obj)
    {
        var texture = THREE.ImageUtils.loadTexture( obj["logo"] );
        var material = new THREE.MeshBasicMaterial( { map: texture,opacity:0, color:0xde3ed4,transparent:true, blending:THREE.AdditiveBlending, depthTest:false} );
        var logo = new THREE.Mesh(this.logoGeometry,material);
        logo.rotation.y = 0.7*Math.PI;
        var delayTime =0;
        if(container.children.length == 0)
        {
            var i = container.userData["id"];
            delayTime= (this.topNum-i)*0.2+2;
        }
        TweenLite.to(material, 1, { delay:delayTime, opacity:1});
        TweenLite.to(logo.rotation, 1.5, {delay:delayTime, y:0});
        container.add(logo);
    };

    p.removeLogoItem = function(container)
    {
        if(container.children.length>0)
        {
            var logo = container.children[0];
            TweenLite.to(logo.material, 1, { opacity:0});
            TweenLite.to(logo.rotation, 1.5, { y: -0.7*Math.PI,onCompleteScope:this, onComplete:function(){
                logo.visbile =false;
                container.remove(logo);
            }});
        }
    };
    /*-------------------------------------------------- logo end--------------------------------------------------*/

    //=================================================   threejs    end ==============================================//
    jd.It_4 = It_4;
})();