"use strict";(self.webpackChunkresview=self.webpackChunkresview||[]).push([[9558],{9558:(e,t,a)=>{a.d(t,{ParallaxMover:()=>n});var i=a(4409);class n{init(){}isEnabled(e){return!(0,i.B9)()&&!e.destroyed&&e.container.actualOptions.interactivity.events.onHover.parallax.enable}move(e){const t=e.container,a=t.actualOptions.interactivity.events.onHover.parallax;if((0,i.B9)()||!a.enable)return;const n=a.force,s=t.interactivity.mouse.position;if(!s)return;const r=t.canvas.size,o=.5*r.width,c=.5*r.height,l=a.smooth,v=e.getRadius()/n,u=(s.x-o)*v,p=(s.y-c)*v,{offset:f}=e;f.x+=(u-f.x)/l,f.y+=(p-f.y)/l}}}}]);
//# sourceMappingURL=9558.502f5044.chunk.js.map