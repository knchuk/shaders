#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

varying vec2 vTexCoord;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float pct, float rnd) {    
    return  smoothstep(pct-0.0001+rnd*(-0.8), pct, st.y) -
          smoothstep(pct, pct+0.0001-rnd*(-0.8), st.y);
}

float line_plot(vec2 st, float pct, float rnd) {    
    return  smoothstep(pct-0.0001+rnd*(-0.8), pct, st.y) -
          smoothstep(pct, pct+0.0001-rnd*(-0.8), st.y);
}

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
	vec2 m_st = u_mouse.xy/u_resolution;
    float y = 0.5+(0.6*sin(st.x*cos(0.4*u_time)*PI));
    //float y_c = sin(u_time)+sqrt(1.0-pow((st.x-0.5),2.0));
    float y_c = sin(u_time)+sin(st.x);
    float rnd_2 = step(0.2, random(st));

    vec3 color = vec3(0.5+abs(sin(u_time))*0.2, 0.3, y+rnd_2*0.3);
    float rnd = step(0.2,random(st));

    float pct = plot(st,y, rnd);
    float cir = line_plot(st,y_c, rnd);
    
    vec3 line_color = vec3(0.2, 0.3, sin(0.1*u_time));
    vec3 cir_color = vec3(0.190,0.285,0.285);
    color = (1.0-pct)*(1.0-cir)*color+pct*line_color+cir*cir_color;
    
	gl_FragColor = vec4(color,1.0);
}
