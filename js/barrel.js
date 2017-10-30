$(function(){
			function Barrel($ct){
				this.$ct = $ct
				this.imgNum =100
				this.baseHeight =200
				this.rowList =[]
				this.loadImg()
			}

			Barrel.prototype = {
				getImgUrl: function(){
					var urls = []
					for(var i=0;i<this.imgNum;i++){
						var randomWidth = parseInt(Math.random()*300+300)
						var randomHeight = parseInt(Math.random()*200+200)
						urls.push('https://picsum.photos/'+randomWidth+'/'+randomHeight+'/')
					}
					return urls
				},
				loadImg: function(){
					var _this =this
					var imgUrls = this.getImgUrl()
					$.each(imgUrls,function(idx,imgSrc){
						var img = new Image()
						img.src = imgSrc
						img.onload = function(){
							var imgInfo = {
								target: img,
								width: img.width*_this.baseHeight/img.height,
								height: _this.baseHeight 
							} 
							console.log(img.width)
							_this.render(imgInfo)
						}
					})
				},
				render: function(imgInfo){
					var _this = this
					var clientWidth = this.$ct.width()
					var rowWidth = 0
					var newRowHeight = 0
					var lastImgInfo = imgInfo
					var rowList = this.rowList

					rowList.push(imgInfo)
					$.each(rowList,function(idx,imgInfo){
						rowWidth += imgInfo.width
						if(rowWidth > clientWidth){
							rowList.pop()
							rowWidth = rowWidth - lastImgInfo.width
							newRowHeight = clientWidth * _this.baseHeight / rowWidth;
							_this.layout(newRowHeight)
							_this.rowList = []
							_this.rowList.push(lastImgInfo)
						}
					})

				},
				layout: function(newRowHeight){
					var $rowCt = $('<div class="img-row"></div>');
					$.each(this.rowList, function(idx, imgInfo) {
						var $imgCt = $('<div class="img-box "></div>'),
						$img = $(imgInfo.target);
						$img.height(newRowHeight);
						$imgCt.append($img);
						$rowCt.append($imgCt);
					})
					this.$ct.append($rowCt);
				}
			}

			new Barrel($('.img-preview'))
		})