#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec4 bg_color = vec4(0.635,0.628,0.279,0.0);
    vec4 t_color = vec4(0.068+0.2*abs(sin(u_time/6.0)),0.215+0.6*abs(sin(u_time/8.0)),0.240+0.7*abs(sin(u_time/4.0)),0.7);
    
    float rnd = step(0.156+0.05*sin(u_time),random(st));
    
    vec4 color = (1.0-rnd)*bg_color+rnd*t_color;
    
	gl_FragColor = vec4(color);
}
