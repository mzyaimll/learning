this.jd = this.jd||{};
(function(){
    var Digital_3 = function(obj)
    {
        this.init(obj);
    };

    var p = Digital_3.prototype;
    p.recW = 100;
    p.recH = 100;
    p.topNum = 3;

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
            {id:"title", type:"texture", url:"static/images/digital_3/title.png"},
            {id:"rec", type:"texture", url:"static/images/digital_3/rec.png"},
            {id:"numLine", type:"texture", url:"static/images/digital_3/numLine.png"},
            {id:"lightPanel", type:"texture", url:"static/images/digital_3/lightPanel.png"},
            {id:"spark", type:"texture", url:"static/images/spark1.png"},
            {id:"sortNum_1", type:"texture", url:"static/images/num/num_1.png"},
            {id:"sortNum_2", type:"texture", url:"static/images/num/num_2.png"},
            {id:"sortNum_3", type:"texture", url:"static/images/num/num_3.png"}
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
        var apiUrl = "http://data.jd.com/digitalBUData?type=api13_2e79a3a0_1540_476e_bdb1_39eb5cac09ad";
        this.dataTool = new jd.DataTool(apiUrl,true);
        this.dataTool.eventDispatcher.bind("updateData",function(e,ary,sum){
            //scope3["component3"].update(ary);
            cur.dataUpdate(ary,sum);
        });
    };

    p.dataUpdate = function(ary,sum)
    {
        //this.numItemUpdate(ary);
        this.logoUpdate(ary);
        //this.titleSumUpdate(sum);
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
        this.camera = new THREE.PerspectiveCamera( 30, width / height, 1, 10000 );
        this.camera.position.set(0, 0, 900);
        //
        this.titleCamera = new THREE.PerspectiveCamera( 48, width / height, 1, 3000 );
        this.titleCamera.position.set(0, 0, 1000);
    };

    p.initScene = function()
    {
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog( 0x000000, 0, 4000 );
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
        this.createLine();
        this.createRec();
        this.createPanel();
        this.panelAppear();
        //this.createInnerParticle();
        this.createBgParticle();
        this.createLightPanel()
        this.createNumLine();
        this.numLineAppear();
        this.createSortNum();
        this.sortNumAppear();
        this.createLogo();
    };

    p.render = function()
    {
        if(this.renderer)
        {
            //this.container.rotation.y +=0.01;
            this.lightPanelRender();
            this.bgParticleRender();
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
        //this.container.rotation.y = 0.55;
        //this.container.rotation.x = 0.15;
        this.container.rotation.y = 30*(Math.PI/180);
        this.container.rotation.x = 10*(Math.PI/180);
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
    p.createLineShaderMaterial = function()
    {
        this.lineShaderMaterial = new THREE.ShaderMaterial( {
            uniforms: {
                color:    { type: "c", value: new THREE.Color( 0xffffff ) },
                opacity:  { type: "f", value: 1 }
            },
            vertexShader:   document.getElementById( 'lineVShader' ).textContent,
            fragmentShader: document.getElementById( 'lineFragmentShader' ).textContent,
            blending:       THREE.AdditiveBlending,
            depthTest:      false,
            transparent:    true
        });
    };
    /*-------------------------------------------------- title end--------------------------------------------------*/

    p.createLine = function()
    {
        var material = new THREE.LineBasicMaterial({color: 0x666666,opacity: 0.5 });
        for(i=0;i<4;i++)
        {
            var line = this.createLineFun(this.lineShaderMaterial,i);
            this.container.add(line);
        }
    };

    p.createLineFun = function(material,id)
    {
        var posX,posY;
        if(id==0)
        {
            posX = this.recW/2;
            posY = this.recH/2;
        }
        if(id==1)
        {
            posX = this.recW/2;
            posY = -this.recH/2;
        }
        if(id==2)
        {
            posX = -this.recW/2;
            posY = -this.recH/2;
        }
        if(id==3)
        {
            posX = -this.recW/2;
            posY = this.recH/2;
        }
        //
        var num = 2;
        var positionAry = new Float32Array(num*3);
        var colorAry = new Float32Array(num*3);
        var opacityAry = new Float32Array(num);
        var color = new THREE.Color( 0xffffff );
        //
        var i =num;
        var i3 = positionAry.length;
        while(i3>0)
        {
            i--;
            i3 -= 3;
            positionAry[i3] = posX;
            positionAry[i3+1] = posY;
            if(i==0)
            {
                opacityAry[i] = 0;
                positionAry[i3+2] = -25000;
            }
            if(i==1)
            {
                opacityAry[i] = 0.1;
                positionAry[i3+2] = 1500;
            }

            color.toArray( colorAry, i * 3 );
        }
        //
        var geometry = new THREE.BufferGeometry();
        geometry.addAttribute( 'position', new THREE.BufferAttribute( positionAry, 3 ) );
        geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colorAry, 3 ) );
        geometry.addAttribute( 'customOpacity', new THREE.BufferAttribute( opacityAry, 1 ) );
        var line = new THREE.Line( geometry, this.lineShaderMaterial );
        return line;
    };

    p.createRec = function()
    {
        var recNum = this.topNum*2+2;
        for(var i=0;i<recNum;i++)
        {
            var rec = this.createRecFun();
            this.container.add(rec);
            rec.position.z = -100*i+400-Math.floor(i/2)*100;
        }
    };

    p.createRecFun = function( )
    {
        var num = 5;
        var positionAry = new Float32Array(num*3);
        var colorAry = new Float32Array(num*3);
        var opacityAry = new Float32Array(num);
        var color = new THREE.Color( 0xffffff );
        var i =num;
        var i3 = positionAry.length;
        while(i3>0)
        {
            i--;
            i3 -= 3;
            if(i==0)
            {
                positionAry[i3] = this.recW/2;
                positionAry[i3+1] = this.recH/2;
            }
            if(i==1)
            {
                positionAry[i3] = this.recW/2;
                positionAry[i3+1] = -this.recH/2;
            }
            if(i==2)
            {
                positionAry[i3] = -this.recW/2;
                positionAry[i3+1] = -this.recH/2;
            }
            if(i==3)
            {
                positionAry[i3] = -this.recW/2;
                positionAry[i3+1] = this.recH/2;
            }
            if(i==4)
            {
                positionAry[i3] = this.recW/2;
                positionAry[i3+1] = this.recH/2;
            }
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

    p.createPanel = function()
    {
        this.panelAry =[];
        for(var i = 0;i<this.topNum;i++)
        {
            var item = this.createPanelFun();
            this.container.add(item);
            this.panelAry.push(item);
            item.position.z=-2000;
            item.userData["endZ"] = -300*i+200;
        }
    };

    p.createPanelFun = function()
    {
        var geometry = new THREE.PlaneGeometry( 115, 115, 4, 4 );
        var map = this.resourcesMap["rec"]["result"];
        var material = new THREE.MeshBasicMaterial( {color:0xde3ed4, map: map/*,alphaMap:map*/, side: THREE.DoubleSide,transparent:true } );
        var item = new THREE.Mesh(geometry, material);
        return item
    };

    p.panelAppear = function()
    {
        var ary = this.panelAry;
        for(var i=0;i<ary.length;i++)
        {
           this.panelItemAppear(ary[i],i);
        }
    };

    p.panelItemAppear = function(panel,i)
    {
       // var delayTime = (this.topNum-i)*0.2;
        var delayTime = i*0.15;
        TweenLite.to(panel.position, 1.6, { delay:delayTime, z:panel.userData["endZ"]});
    };

    /*--------------------------------------------------- lightPanel start---------------------------------------------*/
    p.createLightPanel = function()
    {
        this.createLeftLightPanel();
        this.createRightLightPanel();
    };
    p.createLeftLightPanel = function()
    {
        var texture = this.resourcesMap["lightPanel"]["result"];
        var material = new THREE.MeshBasicMaterial( { map: texture,opacity:0.5, /*color:0xde3ed4,*/transparent:true, blending:THREE.AdditiveBlending, depthTest:false} );
        var geometry = new THREE.PlaneGeometry( texture.image.width,texture.image.height );
        this.leftLightPanel = new THREE.Mesh(geometry,material);
        this.container.add(this.leftLightPanel);
        this.leftLightPanel.position.x = -50;
        this.leftLightPanel.rotation.y = -90*(Math.PI/180);
        this.leftLightPanel.position.z = -4000;
    };

    p.createRightLightPanel = function()
    {
        var texture = this.resourcesMap["lightPanel"]["result"];
        var material = new THREE.MeshBasicMaterial( { map: texture,opacity:0.5, /*color:0xde3ed4,*/transparent:true, blending:THREE.AdditiveBlending, depthTest:false} );
        var geometry = new THREE.PlaneGeometry( texture.image.width,texture.image.height );
        this.rightLightPanel = new THREE.Mesh(geometry,material);
        this.container.add(this.rightLightPanel);
        this.rightLightPanel.position.x = 50;
        this.rightLightPanel.rotation.y = -90*(Math.PI/180);
        this.rightLightPanel.position.z = -4000;
    }

    p.lightPanelRender = function()
    {
        this.leftLightPanel.position.z +=12;
        if(this.leftLightPanel.position.z>800)
        {
            this.leftLightPanel.position.z = -4000;
        }
        this.rightLightPanel.position.z +=12;
        if(this.rightLightPanel.position.z>800)
        {
            this.rightLightPanel.position.z = -4000;
        }
    }

    /*--------------------------------------------------- numLine start-----------------------------------------------*/
    p.createNumLine = function()
    {
        this.numLineAry =[];
        for(var i=0;i<this.topNum;i++)
        {
            var numLineItem = this.createNumLineItem();
            this.container.add(numLineItem);
            this.numLineAry.push(numLineItem);
            numLineItem.position.z = -300*i+200;
            numLineItem.position.x = -65;
            numLineItem.position.y = -50;
            numLineItem.scale.set(1,0.2,1);
        }
    };

    p.createNumLineItem = function()
    {
        var texture = this.resourcesMap["numLine"]["result"];
        var material = new THREE.MeshBasicMaterial( { map: texture,opacity:0, /*color:0xde3ed4,*/transparent:true, /*blending:THREE.AdditiveBlending,*/ depthTest:false} );
        var geometry = new THREE.PlaneGeometry( texture.image.width,texture.image.height );
        var numLine = new THREE.Mesh(geometry,material);
        return numLine;
    };

    p.numLineAppear = function()
    {
        var ary = this.numLineAry;
        console.log(ary.length+"=====================");
        for(var i = 0; i<ary.length; i++)
        {
            console.log(i);
            this.numLineItemAppear(ary[i],i);
        }
    };

    p.numLineItemAppear = function(numLineItem,i)
    {
        var delayTime = 1+(this.topNum-i)*0.1;
        TweenLite.to(numLineItem.material, 1, { delay:delayTime, opacity:0.2});
        //TweenLite.to(numLineItem.position, 1, { delay:delayTime,y:numLineItem.userData["endY"]});
    };
    /*--------------------------------------------------- numLine end-----------------------------------------------*/

    /*--------------------------------------------------- sortNum start-----------------------------------------------*/
    p.createSortNum = function()
    {
        this.sortNumAry = [];
        for(var i=0;i<this.topNum;i++)
        {
            var sortNumItem = this.createSortNumItem(i);
            this.container.add(sortNumItem);
            this.sortNumAry.push(sortNumItem);
            sortNumItem.position.z = -300*i+200;
            sortNumItem.position.x = -120;
            sortNumItem.position.y = -100;
            sortNumItem.userData["endY"] =-65;
            var s = i*0.2+0.6;
            sortNumItem.scale.set(s,s,1);
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
            this.sortNumItemAppear(ary[i],i);
        }
    };

    p.sortNumItemAppear = function(sortNumItem,i)
    {
        var delayTime = (this.topNum-i)*0.1;
        TweenLite.to(sortNumItem.material, 1, { delay:delayTime, opacity:1});
        TweenLite.to(sortNumItem.position, 1, { delay:delayTime,y:sortNumItem.userData["endY"]});
    };

    /*-------------------------------------------------- logo start--------------------------------------------------*/
    p.createLogo = function()
    {
        this.logoGeometry = new THREE.PlaneGeometry( 90, 25, 5,5 );
        //
        this.logoContainerAry =[];
        for(var i=0;i<this.topNum;i++)
        {
            var logoContainer = new THREE.Object3D();
            this.container.add(logoContainer);
            logoContainer.position.z = -300*i+200;
            logoContainer.position.x = -120;
            logoContainer.position.y = -30;
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
        var s = container.userData["id"]*0.4+0.7;
        logo.scale.set(s,s,1);
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

    /*-------------------------------------------------- logo start--------------------------------------------------*/
    /*p.createLogo = function()
    {
        this.logoGeometry = new THREE.PlaneGeometry( 110, 30, 5,5 );
        //
        this.logoContainerAry =[];
        for(var i=0;i<this.topNum;i++)
        {
            var logoContainer = new THREE.Object3D();
            this.container.add(logoContainer);
            logoContainer.position.z = -300*i+200;
            logoContainer.position.x = -120;
            logoContainer.position.y = -30;
            //logoContainer.rotation.y= -45*(Math.PI/180);
            logoContainer.userData["brandId"] = "_";
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
        container.add(logo);
        TweenLite.to(material, 1, { opacity:1});
        TweenLite.to(logo.rotation, 1.5, { y:0});
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
    };*/

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
            positionAry[i3+1] = 1500*(Math.random()-0.5);
            positionAry[i3+2] = -5000*(Math.random());
            //
            vYAry[i] = 6*Math.random()+3;
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
    /*-------------------------------------------------- logo end--------------------------------------------------*/
    jd.Digital_3 = Digital_3;
})();