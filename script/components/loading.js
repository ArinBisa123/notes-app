class IndikatorLoading extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback(){
		this.render();
	}

	render(){
		this.innerHTML = `
			<style>
				.backdrop {
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
            		background-color: rgba(184, 184, 184, 0.5);
					z-index: 1;
					overflow: hidden;
				}
				.lds-ellipsis,
				.lds-ellipsis div {
					box-sizing: border-box;
				}
				.lds-ellipsis {
					position: fixed;
					top: calc(50% - 40px);
					left: calc(50% - 40px);
				}
				.lds-ellipsis div {
					position: absolute;
					top: 33.33333px;
					width: 13.33333px;
					height: 13.33333px;
					border-radius: 50%;
					background: currentColor;
					animation-timing-function: cubic-bezier(0, 1, 1, 0);
				}
				.lds-ellipsis div:nth-child(1) {
					left: 8px;
					animation: lds-ellipsis1 0.6s infinite;
				}
				.lds-ellipsis div:nth-child(2) {
					left: 8px;
					animation: lds-ellipsis2 0.6s infinite;
				}
				.lds-ellipsis div:nth-child(3) {
					left: 32px;
					animation: lds-ellipsis2 0.6s infinite;
				}
				.lds-ellipsis div:nth-child(4) {
					left: 56px;
					animation: lds-ellipsis3 0.6s infinite;
				}
				@keyframes lds-ellipsis1 {
					0% {
						transform: scale(0);
					}
					100% {
						transform: scale(1);
					}
				}
				@keyframes lds-ellipsis3 {
					0% {
						transform: scale(1);
					}
					100% {
						transform: scale(0);
					}
				}
				@keyframes lds-ellipsis2 {
					0% {
						transform: translate(0, 0);
					}
					100% {
						transform: translate(24px, 0);
					}
				}
			</style>
			<div class="backdrop"></div>
			<div class="lds-ellipsis">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
        `;
	}
}

customElements.define('indikator-loading', IndikatorLoading);
