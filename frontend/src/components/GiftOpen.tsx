export default function GiftOpen({number} : {number : number}) {
  return (
    <svg width={`${number === 25 ? '52' : '32'}`} height={`${number === 25 ? '52' : '32'}`} viewBox="0 0 142 142"
         fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M116.817 27.8808C115.794 33.509 114.782 39.1358 113.779 44.764C85.5447 45.1471 57.3 47.1721 29.11 50.8493C27.9799 45.3719 26.8277 39.9035 25.6769 34.435C37.9599 32.7842 50.2636 31.4515 62.5673 30.4176C62.7285 31.2696 63.2403 31.8775 63.8586 31.8243C68.7946 31.419 73.732 31.0669 78.6577 30.7578C79.2656 30.7164 79.7774 30.0448 79.9046 29.1706C91.7927 28.4562 103.682 28.0302 115.57 27.9015C115.986 27.8912 116.402 27.8912 116.817 27.8808Z" fill="#A36F2D"/>
      <mask id="mask0_2482_3124" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="20" y="30" width="102" height="28">
        <path d="M20.3237 30.2933H121.712V57.936H20.3237V30.2933Z" fill="white"/>
      </mask>
      <g mask="url(#mask0_2482_3124)">
        <path d="M28.4917 57.7348C25.804 51.2443 23.0853 44.7537 20.3237 38.2734L20.942 37.6019C20.942 37.6019 22.7969 36.7706 22.8501 36.7706C22.9034 36.7706 26.017 36.7174 26.0703 36.7174C26.1235 36.7174 27.6915 37.1108 27.6915 37.1108L27.8838 37.4525C29.1307 40.7451 30.3673 44.0392 31.6039 47.3437L32.3301 48.5152L32.021 54.0266L31.2311 55.8814L29.6099 57.0633L28.4917 57.7348ZM116.146 52.0223C117.969 45.2329 119.824 38.4435 121.712 31.6645L120.997 31.0788L118.406 30.6306L114.174 30.8761L114.109 31.8346C113.3 35.2678 112.499 38.6994 111.711 42.1208L110.794 43.5481L111.455 47.2683L112.371 49.9441L114.686 51.7028L116.146 52.0223Z" fill="#D39D40"/>
      </g>
      <path d="M43.1517 14.3657L43.7064 15.1866L45.5613 17.1051L48.4516 19.1508L52.503 20.8785L57.4287 22.1032L60.0202 22.6786L61.3529 22.9463L60.9151 23.4685L57.0559 23.9581L52.8758 23.7776L47.8111 22.3059L46.6707 20.6226L42.8958 14.589L43.1517 14.3657ZM93.297 17.574L96.2612 11.1041L94.8102 13.0433L92.2734 15.7724L89.2026 17.8728L84.9796 19.8549L81.8127 20.9628L80.267 21.5071L79.6383 21.624L79.3617 21.8473L81.045 21.9435L89.139 22.0721L91.7512 21.4849L92.9346 20.1108L93.5736 18.3195L93.297 17.574ZM111.711 42.1208C84.9589 42.8663 58.2392 44.6043 31.6157 47.3437C30.5596 50.8079 29.5257 54.2706 28.5021 57.7349C57.6313 54.6227 86.8774 52.7146 116.156 52.012C114.686 48.7179 113.204 45.4134 111.711 42.1208Z" fill="#E7AB45"/>
      <mask id="mask1_2482_3124" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="20" y="3" width="102" height="139">
        <path d="M20.3237 3.40802H121.712V141.243H20.3237V3.40802Z" fill="white"/>
      </mask>
      <g mask="url(#mask1_2482_3124)">
        <path d="M42.1178 11.4132C41.4995 7.82183 46.542 5.28506 53.3343 7.16064C60.1266 9.02587 62.7388 14.2488 62.7388 14.2488L64.039 17.0296L64.5405 18.2988C60.1577 14.1098 54.7839 12.0212 49.453 13.8213C47.4916 14.5683 46.4251 15.762 46.4784 17.6376L46.0953 17.7544C46.1056 17.7337 42.7257 15.0047 42.1178 11.4132ZM63.2935 14.3021L63.1116 14.6423L65.1588 19.2898L66.1394 21.8902L67.7813 21.7201L67.7606 21.4435C67.7177 21.337 63.4843 14.6216 63.2935 14.3021ZM89.639 11.1899C91.6861 11.6691 92.8916 12.7134 93.0839 14.5787C93.0839 14.5787 94.6726 14.8553 96.3988 9.50512C98.1368 4.15498 90.5353 1.57531 83.5196 5.74212C76.504 9.91042 75.0425 17.0725 75.0425 17.0725L75.2674 17.5843C79.0629 12.8628 84.1276 10.1027 89.639 11.1899ZM75.9922 13.4708C75.8635 13.7577 72.4836 21.0914 72.4939 21.1343L74.0411 21.5914C73.9657 19.3327 75.9922 13.4708 75.9922 13.4708ZM62.7388 34.3507L64.252 33.8285L64.5198 24.0335L62.4933 22.7333C61.949 22.7747 61.4165 22.8073 60.8721 22.8502H60.6917L60.5423 22.8605L60.6059 22.8812C59.7213 22.9463 58.825 23.0099 57.9404 23.0839L56.8961 23.0735L52.6302 22.6253L47.0641 22.4774L41.4033 22.6253L39.6431 24.1178L38.4287 24.7465C33.4706 25.2154 28.5228 25.7168 23.5764 26.2493C23.0957 26.3025 22.7008 26.6546 22.6061 27.1131C21.8488 30.8229 21.0811 34.5533 20.3237 38.2734C23.5971 37.8992 26.8705 37.559 30.1439 37.2173C40.998 36.0991 51.8625 35.1391 62.7388 34.3507ZM65.9264 91.2986C53.7825 91.3948 41.6489 91.7143 29.5153 92.2482C28.8423 92.2793 28.3098 92.8665 28.3423 93.5262C29.2372 108.108 30.1336 122.731 31.0388 137.376C31.0388 139.487 32.6393 141.192 34.611 141.192C45.2092 141.182 55.8193 141.182 66.4175 141.182H80.9918C91.59 141.182 102.2 141.192 112.798 141.192C114.77 141.192 116.37 139.487 116.37 137.376C117.265 122.721 118.162 108.108 119.067 93.5262C119.1 92.8547 118.567 92.2689 117.894 92.2482C105.76 91.7039 93.6268 91.3948 81.4828 91.2986H65.9264ZM117.98 20.8784C117.82 20.4302 117.394 20.1433 116.913 20.1536C111.934 20.2705 106.966 20.4095 101.987 20.59L100.11 19.9717L96.8573 19.2366L92.2305 19.9717L82.4206 21.4745C81.4828 21.5278 80.5332 21.581 79.5954 21.6343L79.6058 21.6239L79.5422 21.6343L79.4786 21.6461C78.9342 21.6772 78.4017 21.7097 77.8574 21.7408L76.322 23.1371L77.356 32.1438L79.1369 33.2946C80.3853 33.2206 81.6322 33.157 82.8895 33.0816C95.8234 32.379 108.768 31.9101 121.712 31.6749C120.486 28.0613 119.239 24.4699 117.98 20.8784Z" fill="#B8A65D"/>
      </g>
      <path d="M57.9508 23.0735C51.4469 23.575 44.943 24.1282 38.4391 24.7361C38.6314 24.5128 39.0042 24.2243 38.8222 23.8945C34.5149 14.7074 34.9631 18.1923 47.6085 20.8563C51.4691 21.7837 54.9969 22.5189 57.9508 23.0735ZM103.267 14.1837C103.383 13.8006 102.999 13.459 102.636 13.6305C96.1429 16.614 88.6376 19.4599 82.4325 21.4746C88.9467 21.1225 95.4713 20.8252 101.997 20.59C101.773 20.3874 101.367 20.164 101.506 19.8016C101.496 19.8016 103.267 14.1837 103.267 14.1837ZM79.1473 33.2739C78.8707 29.5227 78.2953 25.7701 77.921 22.0189C77.89 21.3784 77.3456 20.8356 76.6948 20.8785C75.97 20.9214 75.2556 20.9628 74.5308 21.0057C75.1284 17.5207 76.2481 13.4486 78.5393 10.5184C82.3571 5.83829 87.3478 3.14177 92.8384 4.2186C94.3945 4.581 95.4181 5.25254 95.9521 6.36044C96.1222 6.72283 96.2287 7.11777 96.2716 7.52306C96.3352 8.05556 96.2923 8.59989 96.1858 9.13239C94.3945 16.3581 86.7398 18.8638 79.489 21.6343C83.6898 21.4746 91.3134 17.2752 93.4242 15.1334C94.4271 14.1098 95.3012 12.9486 95.9728 11.6795C101.805 0.0399561 80.619 0.658248 75.5647 14.4825C75.2349 15.3035 74.9568 16.1348 74.7127 16.9764C74.3281 18.3091 74.0294 19.6729 73.806 21.0486C71.3535 21.198 68.9011 21.3577 66.4486 21.5278C66.0433 20.1966 65.5744 18.8845 65.0197 17.6169C64.6677 16.8063 64.2846 16.0179 63.8586 15.2502C57.0337 2.20398 35.9541 4.33546 43.2479 15.123C44.0792 16.2945 45.0924 17.3285 46.2225 18.213C48.5995 20.0679 56.6713 23.2333 60.8825 22.8502C53.3343 21.0486 45.4341 19.5664 42.7036 12.6395C42.5231 12.0952 42.4048 11.5405 42.4048 10.9651C42.4048 10.5598 42.4698 10.1441 42.5971 9.76104C42.992 8.65314 43.9194 7.85292 45.3808 7.31006C50.6792 5.52914 55.9791 7.56596 60.3707 11.7017C63.0155 14.3021 64.6677 18.2026 65.7135 21.5811C64.4547 21.7837 62.3336 21.2616 62.483 23.18C62.5998 26.8898 62.514 30.641 62.7285 34.3404C62.8986 34.8521 63.4104 35.2145 63.9858 35.1716C68.6555 34.8403 73.3149 34.5312 77.9861 34.2546C78.5822 34.222 79.0408 33.8064 79.1473 33.2739ZM80.5229 90.2233C75.9804 90.1907 71.4497 90.1907 66.9072 90.2233C66.3747 90.2233 65.9368 90.67 65.9368 91.2247C66.0966 107.799 66.2563 124.383 66.4057 140.957C66.3954 141.469 66.811 141.96 67.3228 141.948C71.5887 141.948 75.8532 141.948 80.1072 141.948C80.5451 141.948 80.9075 141.618 80.9918 141.182C81.2166 124.533 81.3128 107.873 81.4932 91.2247C81.4932 90.67 81.0569 90.2233 80.5229 90.2233Z" fill="#F9E4B6"/>
    </svg>

  )
}