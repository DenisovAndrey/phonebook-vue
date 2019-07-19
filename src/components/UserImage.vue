<template>
	<div class="userImage" id="userImage">
		<div v-if="imageUrl">
			<img class="userImage_img" @click.stop="imgIsOpen = true" :src="imageUrl[size]">
		</div>
		<div v-if="imgIsOpen" class="userImage__popup">
			<div  @click="imgIsOpen = false" class="userImage__popup_bg"></div>
			<div class="userImage__popup_img">
				<button @click="imgIsOpen = false" class="userImage__popup_cross"><div></div><div></div></button>
				<img :src="imageUrl.large">
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		name: 'UserImage',
		props: {
			imageUrl: {
				required: true,
				type: Object
			},
			size: {
				default: 'thumbnail',
				type: String,
				validator: value => ['thumbnail', 'medium', 'large'].indexOf(value) !== -1
			}
		},
		data: () => ({
			imgIsOpen: false
		})
	}
</script>

<style lang="scss" scoped>
	.userImage{
		&_img{
			cursor: pointer;
		}
		&__popup{
			position: fixed;
			z-index: 99;
			width: 100vw;
			height: 100vh;	
			min-width: 100vw;
			min-height: 100vh;
			max-width: 100vw;
			max-height: 100vh;
			top: 0;
			left: 0;
			&_cross{
				padding: 0px 0;
				height: 22px;
				outline: none;
				background: rgba(255, 255, 255, 0.2);
				border: none;
				position: absolute;
				right: 7px;
				top: 7px;
				div{
					border-radius: 2px;
					width: 25px;
					height: 3px;
					background: #000;
					&:nth-child(1){
						transform: rotate(45deg);
					}
					&:nth-child(2){
						margin-top: -3px;
						transform: rotate(-45deg);
					}
				}
			}
			&_bg{
				width: 100%;
				height: 100%;
				background: rgba(0,0,0,0.5);
			}
			&_img{
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				height: 90%;
				width: 90%;
				max-width: 620px;
				max-height: 620px;
				padding: 7px;
				border-radius: 4px;
				background: #fff;
				img{
					width: 100%;
					height: 100%;
					object-fit: contain;
				}
			}
		}
	}
</style>
