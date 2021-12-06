this.jd = this.jd||{};
(function(){
    var Digital_2 = function()
    {
        this.init();
    };

    var p = Digital_2.prototype;
    p.topNum = 5;
    p.showNum = 5;
    p.space = 200;

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
            {id:"title", type:"texture", url:"static/images/digital_2/title.png"},
            {id:"spark", type:"texture", url:"static/images/spark1.png"},
            {id:"arrowCir", type:"texture", url:"static/images/digital_2/arrowCir.png"},
            {id:"dotCir", type:"texture", url:"static/images/digital_2/dotCir.png"},
            {id:"dateMC", type:"texture", url:"static/images/digital_2/dateMC.png"},
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
        //var apiUrl =  ["data/digital_2.json", "data/digital_2_2.json"];
        var apiUrl = "http://data.jd.com/digitalBUData?type=api9_3f994396_32fe_44ab_adcd_42c587b79d3e";
        this.dataTool = new jd.DataTool(apiUrl,true);
        this.dataTool.eventDispatcher.bind("updateData",function(e,ary,sum){
            //scope3["component3"].update(ary);
            cur.dataUpdate(ary,sum);
        });
    };

    p.dataUpdate = function(ary,sum)
    {
        this.numItemUpdate(ary);
        this.logoUpdate(ary);
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
        this.camera = new THREE.PerspectiveCamera( 40, width / height, 1, 5000 );
        this.camera.position.set(0, 50, 1100);
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
        this.createLineShaderMaterial();
        this.createRing();
        this.ringAppear();
        this.createCir();
        //this.createInnerParticle();
        this.createBgParticle();
        this.createNum();
        this.numAppear();
        this.createSortNum();
        this.sortNumAppear();
        this.createLogo();
        this.createCirGeometry();
        this.createLightLine();
    };

    p.render = function()
    {
        if(this.renderer)
        {
            //this.container.rotation.y +=0.01;
            this.ringRender();
            this.bgParticleRender();
            this.cirRender();
            this.lightLineRender();
            this.renderer.render( this.scene, this.camera );
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
        this.title.position.y = 350;
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

    //
    p.createLineShaderMaterial = function()
    {
        this.lineShaderMaterial = new THREE.ShaderMaterial( {
            uniforms: {
                color:    { type: "c", value: new THREE.Color( 0xffffff ) },
                opacity:  { type: "f", value: 1 }
            },
            vertexShader:   document.getElementById( 'lineVShader' ).textContent,
            fragmentShader: document.getElementById( 'lineFragmentShader' ).textContent,
            /*blending:       THREE.AdditiveBlending,*/
            depthTest:      false,
            transparent:    true
        });
    };
    /*-------------------------------------------------- title end--------------------------------------------------*/

    /*------------------------------------------------ ring  start --------------------------------------------------*/
    //创建一个几何空心圆环
    p.createCirGeometry = function()
    {
        //半径
        var r = 120;
        var rSegments = 100;
        //圆环的厚度
        var d = 50;
        var dSegments = 5;
        //内外半径间的距离
        var w = 50;
        var wSegments = 5;

        var vs =[];
        var angle = 0;
        var v;
        for(var i=0; i< dSegments; i++)
        {
            for(var j=0; j< wSegments; j++)
            {
                var R = r+(j/wSegments)*w;
                for(var k=0;k<rSegments;k++)
                {
                    if((j==0 || j==wSegments-1) || (i==0 || i==dSegments-1))
                    {
                        angle = k/rSegments*(2*Math.PI);
                        v = new THREE.Vector3(R*Math.cos(angle),R*Math.sin(angle),d*(i/dSegments));
                        vs.push(v);
                    }
                }
            }
        }
        return vs;
    };

    p.createRing = function()
    {
        this.ringGeometryVs = this.createCirGeometry();
        console.log(this.createCirGeometry().length);
        //
        this.ringAry = [];
        this.ringContainer = new THREE.Object3D();
        this.container.add(this.ringContainer);
        this.ringContainer.position.set(220,0,0);
        this.ringContainer.rotation.set(0,0.8,0);
        //
        for(var i =0; i<this.topNum; i++)
        {
            var ring = this.createRingItem(this.ringGeometryVs,i);
            this.ringContainer.add(ring);
            this.ringAry.push(ring);
            ring.position.z = -(this.topNum-1)*this.space;
            ring.userData["endZ"] = -i*this.space;
            //ring.userData["opacity"] = 1-i*0.2;
            ring.userData["opacity"] = 0;
        }
    };

    p.createRingItem = function(vs,id)
    {
        var pointNum = vs.length;
        var geometry = new THREE.BufferGeometry();
        //
        var positionAry = new Float32Array(pointNum*3);
        var colorAry = new Float32Array(pointNum*3);
        var opacityAry = new Float32Array( pointNum );
        var sizeAry = new Float32Array( pointNum );
        var endYAry  = new Float32Array(pointNum);
        //
        var color = new THREE.Color( 0xd01a27);
        //
        var i = pointNum;
        var i3 = positionAry.length;
        while(i3>0)
        {
            i--;
            i3 -=3;
            positionAry[i3] = vs[i]["x"];
            positionAry[i3+1] = vs[i]["y"];
            positionAry[i3+2] = vs[i]["z"];
            //
            opacityAry[i] = 0;
            sizeAry[i] = 3+Math.random();
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

    p.ringAppear = function()
    {
        var ary = this.ringAry;
        for(var i=0; i<ary.length; i++)
        {
            this.ringItemAppear(ary[i],i);
        }
    };

    p.ringItemAppear = function(ring,i)
    {
        var delayTime = (this.topNum-i)*0.1;
        TweenLite.to(ring.position, 2, { delay:delayTime,z:ring.userData["endZ"]});
        TweenLite.to(ring.rotation, 2, { delay:delayTime,z:-(0.5*i+0.5)});
        TweenLite.to(ring.userData, 2, { delay:delayTime,opacity:1-i*0.1});
    };

    p.ringRender = function()
    {
        var ary = this.ringAry;
        for(var i=0; i<ary.length; i++)
        {
            ary[i].rotation.z += -0.002;
            this.ringItemRender(ary[i]);
        }
    };

    p.ringItemRender = function(ring)
    {
        var positionAry = ring.geometry.attributes.position.array;
        var opacityAry = ring.geometry.attributes.customOpacity.array;
        //
        var i = opacityAry.length;
        var i3 = positionAry.length;
        while(i3>0)
        {
            i--;
            i3 -=3;
            opacityAry[i] = ring.userData["opacity"];
        }
        ring.geometry.attributes.position.needsUpdate = true;
        ring.geometry.attributes.customOpacity.needsUpdate = true;
    };

    /*------------------------------------------------ ring  end --------------------------------------------------*/

    /*------------------------------------------------ cir  start --------------------------------------------------*/
    p.createCir = function()
    {
        this.arrowCirAry =[];
        for(var i =0; i<this.topNum; i++)
        {
            console.log(i);
            var cir = this.createCirItem();
            this.ringContainer.add(cir);
            cir.position.z = -i*this.space+25;
            this.arrowCirAry.push(cir);
        }
        this.arrowCirAppear();
        this.createDotCir();
        this.dotCirAppear();
        this.createDateMC();
        this.dateAppear();
    };

    p.createCirItem = function()
    {
        var texture = this.resourcesMap["arrowCir"]["result"];
        var w = texture.image.width;
        var h = texture.image.height;
        var geometry = new THREE.PlaneGeometry( w, h, 5,5 );
        var material = new THREE.MeshBasicMaterial( { map: texture,opacity:0/*,alphaMap:map*/, side: THREE.DoubleSide,transparent:true,depthTest:false } );
        var cir = new THREE.Mesh( geometry, material );
        return cir;
        //this.arrowCir.rotation.z = -1;
    };

    p.arrowCirAppear = function()
    {
        var ary = this.arrowCirAry;
        for(var i=0;i<ary.length;i++)
        {
            var delayTime = (this.topNum-i*0.1)*0.4;
            var cir = ary[i];
            TweenLite.to(cir.material, 1, { delay:delayTime, opacity:0.5});
        }
    };

    p.createDotCir = function()
    {
        var texture = this.resourcesMap["dotCir"]["result"];
        var w = texture.image.width;
        var h = texture.image.height;
        var geometry = new THREE.PlaneGeometry( w, h, 5,5 );
        var material = new THREE.MeshBasicMaterial( { map: texture,opacity:0/*,alphaMap:map*/, side: THREE.DoubleSide,transparent:true,depthTest:false } );
        this.dotCir = new THREE.Mesh( geometry, material );
        this.ringContainer.add(this.dotCir);
        this.dotCir.position.z = 25;
    };

    p.dotCirAppear = function()
    {
        TweenLite.to(this.dotCir.material, 1, { delay:2, opacity:1});
    };

    p.cirRender = function()
    {
        this.dotCir.rotation.z += 0.002;
    };

    p.createDateMC = function()
    {
        var texture = this.resourcesMap["dateMC"]["result"];
        var w = texture.image.width;
        var h = texture.image.height;
        var geometry = new THREE.PlaneGeometry( w, h, 5,5 );
        var material = new THREE.MeshBasicMaterial( { map: texture,opacity:0/*,alphaMap:map*/, side: THREE.DoubleSide,transparent:true,depthTest:false } );
        this.dateMC = new THREE.Mesh( geometry, material );
        this.ringContainer.add(this.dateMC);
        this.dateMC.position.z = 25;
        this.dateMC.position.x = 0;
    };

    p.dateAppear = function()
    {
        TweenLite.to(this.dateMC.position, 1, { delay:2, x:350});
        TweenLite.to(this.dateMC.material, 1, { delay:2, opacity:1});
    };
    /*------------------------------------------------ cir  end --------------------------------------------------*/


    /*------------------------------------------------ box  start --------------------------------------------------*/
    //假设导入的长方体模型的底边长为boxD、长主体的高度为boxH
    /*
    p.createBoxItem = function()
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
            positionAry[i3] = vs[i]["x"]*1.4;
            positionAry[i3+1] = vs[i]["y"]*2;
            positionAry[i3+2] = vs[i]["z"]*1.4;
            //
            opacityAry[i] = 0.8;
            sizeAry[i] = 3;
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
        var delayTime = (this.topNum-i)*0.1;
        TweenLite.to(box.rotation, 1.6, { delay:delayTime, y:-0.5});
        TweenLite.to(box.scale, 1.5, { delay:delayTime, y:box.userData["scaleY"],onCompleteScope:this, onComplete:function(){
            //this.innerParticleItemAry[i].visible = true;
            this.innerParticleItemAppear(this.innerParticleItemAry[i]);
        }});
    };*/
    /*-------------------------------------------------- box  end  --------------------------------------------------*/


    /*---------------------------------------------- bgParticle start-----------------------------------------------*/
    p.createBgParticle = function(id)
    {
        var particleNum = 1500;
        var positionAry = new Float32Array(particleNum*3);
        var vYAry = new Float32Array(particleNum);
        var colorAry = new Float32Array(particleNum*3);
        var opacityAry = new Float32Array( particleNum );
        var sizeAry = new Float32Array( particleNum );

        var color = new THREE.Color( 0xd01a27 );
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
            vYAry[i] = vYAry[i] = 5*Math.random()+3;;
            opacityAry[i] = 0.2+0.5*Math.random();
            sizeAry[i] = 4*Math.random()+2;
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
                positionAry[i3+2] = -5000;
            }
        }
        this.bgParticle.geometry.attributes.position.needsUpdate = true;
        this.bgParticle.geometry.attributes.customOpacity.needsUpdate = true;
        this.bgParticle.geometry.attributes.customColor.needsUpdate = true;
        this.bgParticle.geometry.attributes.size.needsUpdate = true;
    };
    /*---------------------------------------------- bgParticle end-----------------------------------------------*/


    /*---------------------------------------------- lightLine start-----------------------------------------------*/
    p.createLightLine = function()
    {
        var num = 500
        this.lightLineAry =[];
        for(var i=0;i<num;i++)
        {
            var line = this.createLightLineItem();
            this.ringContainer.add(line);
            this.lightLineAry.push(line);
            line.position.z = -900+i*2;
            line.userData["opacity"] = 0;
            var mid = num/2;
            if(i < mid) line.userData["endOpacity"] = i*0.005;
            if(i >= mid) line.userData["endOpacity"] = ((num-1)-i)*0.005;
            if(line.userData["endOpacity"] > 0.25) line.userData["endOpacity"] = 0.25;
        }
        var cur = this;
        setInterval(function(){
            cur.lightRun();
        },4500)
    };

    p.createLightLineItem = function()
    {
        var num = 50;
        var r = 160;
        var positionAry = new Float32Array(num*3);
        var colorAry = new Float32Array(num*3);
        var opacityAry = new Float32Array(num);
        var i =num;
        var i3 = positionAry.length;
        var color = new THREE.Color( 0xffffff );
        while(i3>0)
        {
            i--;
            i3 -=3;
            var angle = (i/num)*((1+1/num)*2*Math.PI);
            var posX =r*Math.cos(angle);
            var posZ = 0;
            var posY = r*Math.sin(angle);
            //
            positionAry[i3] = posX;
            positionAry[i3+1] = posY;
            positionAry[i3+2] = posZ;
            //
            opacityAry[i] = 0.1;
            color.toArray( colorAry, i * 3 );
        }
        var geometry = new THREE.BufferGeometry();
        geometry.addAttribute( 'position', new THREE.BufferAttribute( positionAry, 3 ) );
        geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colorAry, 3 ) );
        geometry.addAttribute( 'customOpacity', new THREE.BufferAttribute( opacityAry, 1 ) );
        var line = new THREE.Line( geometry, this.lineShaderMaterial );
        return line;
    };

    p.lightRun = function()
    {
        var ary = this.lightLineAry;
        for(var i=0; i<ary.length; i++)
        {
            var line = ary[i]
            TweenLite.to(line.userData, 0.3, { delay:i*0.004, opacity:line.userData["endOpacity"]});
            TweenLite.to(line.userData, 0.3, { delay:i*0.004+0.2, opacity:0});
        }
    };

    p.lightLineRender = function()
    {
        var ary = this.lightLineAry;
        for(var i=0; i<ary.length; i++)
        {
            this.lightLineItemRender(ary[i]);
        }
    };

    p.lightLineItemRender = function(lightLine)
    {
        var positionAry = lightLine.geometry.attributes.position.array;
        var opacityAry = lightLine.geometry.attributes.customOpacity.array;
        var colorAry = lightLine.geometry.attributes.customColor.array;
        var i = opacityAry.length;
        var i3 = positionAry.length;
        var color = new THREE.Color(0xd01a27);
        while(i3>0)
        {
            i--;
            i3 -=3;
            opacityAry[i] = lightLine.userData["opacity"];
            color.toArray( colorAry, i * 3 );
        }
        lightLine.geometry.attributes.position.needsUpdate = true;
        lightLine.geometry.attributes.customOpacity.needsUpdate = true;
        lightLine.geometry.attributes.customColor.needsUpdate = true;
    };
    /*---------------------------------------------- lightLine end-----------------------------------------------*/

    /*--------------------------------------------------- num start--------------------------------------------------*/
    p.createNum = function()
    {
        this.numItemAry =[];
        this.contextAry =[];
        for(var i=0;i<this.showNum;i++)
        {
            var obj = this.createTxtMaterialItem();
            var numItem = this.createNumItem(obj["material"]);
            this.ringContainer.add(numItem);
            this.numItemAry.push(numItem);
            numItem.position.z = -i*this.space+25;
            numItem.position.y =-240;
            numItem.scale.set(1.2,1.2,1);
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
        var material = new THREE.MeshBasicMaterial( { map: texture,opacity:0, side: THREE.DoubleSide,transparent:true } );
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
        var delayTime = 2+(this.topNum-i)*0.1;
        TweenLite.to(numItem.material, 1.5, { delay:delayTime, opacity:1,onCompleteScope:this, onComplete:function(){

        }});
    };
    /*---------------------------------------------------- num end--------------------------------------------------*/

    /*--------------------------------------------------- sortNum start-----------------------------------------------*/
    p.createSortNum = function()
    {
        this.sortNumAry = [];
        for(var i=0;i<this.topNum;i++)
        {
            console.log(i+"=======================");
            var sortNumItem = this.createSortNumItem(i);
            this.ringContainer.add(sortNumItem);
            this.sortNumAry.push(sortNumItem);
            sortNumItem.position.z = -i*this.space+25;
            sortNumItem.position.y =200+50;
            sortNumItem.userData["endY"] =-80;
        }
    };

    p.createSortNumItem = function(i)
    {
        var str = "sortNum_"+(i+1);
        console.log(str);
        var texture = this.resourcesMap[str]["result"];
        var material = new THREE.MeshBasicMaterial( { map: texture,opacity:0, color:0xffffff,transparent:true, /*blending:THREE.AdditiveBlending,*/ depthTest:false} );
        var geometry = new THREE.PlaneGeometry( texture.image.width,texture.image.height );
        var sortNumItem = new THREE.Mesh(geometry,material);
        return sortNumItem;
    };

    p.sortNumAppear = function()
    {
        var ary = this.sortNumAry;
        for(var i = 0; i<ary.length; i++)
        {
            console.log(i)
            this.sortNumItemAppear(ary[i],i);
        }
    };

    p.sortNumItemAppear = function(sortNumItem,i)
    {
        console.log(sortNumItem);
        var delayTime = 2+(this.topNum-i)*0.1;
        TweenLite.to(sortNumItem.material, 2, { delay:delayTime, opacity:1});
        //TweenLite.to(sortNumItem.position, 1, { delay:delayTime,y:sortNumItem.userData["endY"]});
    };
    /*--------------------------------------------------- sortNum end-----------------------------------------------*/
    /*-------------------------------------------------- logo start--------------------------------------------------*/
    p.createLogo = function()
    {
        this.logoGeometry = new THREE.PlaneGeometry( 110, 30, 5,5 );
        //
        this.logoContainerAry =[];
        for(var i=0;i<this.topNum;i++)
        {
            var logoContainer = new THREE.Object3D();
            this.ringContainer.add(logoContainer);
            logoContainer.position.z = -i*this.space+25;
            logoContainer.position.y =220;
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
        var material = new THREE.MeshBasicMaterial( { map: texture,opacity:0, color:0xd01a27,transparent:true, blending:THREE.AdditiveBlending, depthTest:false} );
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
    jd.Digital_2 = Digital_2;
})();