import { cn } from "@/lib/utils"

export function FistIcon({ fisted }: { fisted: boolean }) {
  return (
    <svg
      width="20px"
      height="20px"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M61.971 42.634c-.632-6.334-2.045-11.643-2.358-25.352c-.223-9.706-12.006-10.453-15.069-7.164c-3.471-4.255-12.762-4.354-16.229.94c-2.693-1.48-9.901-1.799-12.879 1.873c0 0-8.835-1.411-12.836 13.321c-1.437 5.289.12 12.302.41 13.756c2.023 10.147 10.502 8.19 12.209 7.2c2.892 7.44 10.375 6.101 13.385 3.913c.174 4.414 3.771 6.535 6.065 5.699c6.722-2.451 12.33-2.783 16.764-2.607c2.127.083 3.797-.938 4.741-2.779c3.325-1.733 6.148-5.279 5.797-8.8m-15.525.998c1.008-5.798-1.179-14.392-.4-20.936c-3.16 4.926-.82 18.871-2.146 24.525c-1.085 4.62-9.646 3.175-12.294-2.375c-.918-8.487.424-13.407-1.889-22.15c.218 10.57-1.415 12.539-.325 22.813c-2.524 2.592-11.239.768-11.679-3.621c-.587-5.858.628-10.459-1.099-16.139c0 5.369-1.062 8.233-.541 16.18c.003.049-1.556 1.24-3.869 1.24c-9.471 0-8.646-14.027-7.087-18.926c2.256-7.098 8.207-11.233 11.281-9.611c1.527-3.561 10.239-3.875 11.74-.539c1.296-6.143 13.705-5.645 17.005-.166c2.214-4.44 12.358-3.112 12.464 3.388c.235 14.059 2.284 20.641 2.203 26.796c-3.471 4.281-9.605 3.902-13.364-.479"
        className={cn("fill-muted-foreground", fisted ? "fill-red-500" : "")}
      ></path>
    </svg>
  )
}

export function FistIcon2() {
  return (
    <svg
      className="fill-muted-foreground"
      height="20px"
      width="20px"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 511.948 511.948"
    >
      <g>
        <g>
          <path
            d="M501.807,218.565c-0.047-0.161-0.095-0.322-0.152-0.484c-7.708-22.955-17.617-38.675-30.17-48.1
                c-1.631-14.336-3.973-29.449-7.083-46.488c0-0.038-0.01-0.066-0.019-0.104c-7.509-38.514-31.791-63.393-61.867-63.393h-8.657
                c-14.108,0-32.635,5.689-45.976,30.625c-8.353-28.141-34.162-49.588-62.777-49.588h-1.394c-28.871,0-54.888,21.836-62.995,50.347
                c-11.909-20.357-29.061-31.384-49.294-31.384h-1.583c-29.374,0-55.77,22.604-63.336,51.845c-10.942-15.54-24.415-23.4-40.173-23.4
                c-17.986,0-42.382,9.946-56.661,57.979C-1.839,198.142-3.091,250.697,6.002,302.865l3.821,18.935
                c8.363,28.776,25.799,41.605,56.51,41.605c17.73,0,33.081-6.903,43.349-18.167c10.012,22.054,32.891,37.129,60.16,37.129h1.583
                c20.859,0,38.855-8.353,50.688-21.902c3.698,9.69,9.842,18.11,17.626,24.813c-1.033,1.071-1.83,2.332-2.276,3.755
                c-3.793,12.193-3.451,28.188,0.882,40.732c8.789,25.505,32.246,41.15,58.482,41.15c6.334,0,12.828-0.92,19.323-2.816
                c0,0,121.951-33.915,122.302-34.02c43.928-12.914,55.543-48.82,63.327-72.884C515.328,313.958,515.337,267.299,501.807,218.565z
                 M455.14,229.222c-0.038,1.489-0.095,2.996-0.152,4.504c-0.095,2.712-0.218,5.461-0.37,8.268c-0.076,1.517-0.152,3.034-0.247,4.57
                c-0.256,4.153-0.559,8.382-0.92,12.8c-0.076,0.92-0.18,1.887-0.256,2.816c-0.341,3.944-0.73,8.012-1.157,12.212
                c-0.133,1.289-0.266,2.588-0.398,3.897c-0.55,5.139-1.138,10.411-1.811,16.014l-4.02,27.183
                c-3.375,15.663-13.483,41.918-43.292,41.918h-8.657c-24.443,0-42.866-17-43.046-39.595v-93.146c0-5.243-4.248-9.482-9.482-9.482
                c-5.234,0-9.481,4.238-9.481,9.482v92.662c0,0.057-0.038,0.104-0.038,0.161v14.63c0,25.221-20.072,44.25-46.706,44.25h-1.394
                c-2.863,0-5.632-0.322-8.344-0.768c-0.825-0.142-1.65-0.303-2.475-0.484c-2.133-0.465-4.2-1.062-6.201-1.792
                c-0.55-0.199-1.128-0.332-1.678-0.559c-16.526-6.665-27.847-21.997-27.98-40.334v-98.285c0-5.243-4.248-9.481-9.482-9.481
                c-5.234,0-9.481,4.238-9.481,9.481v79.644c0,0.057-0.038,0.104-0.038,0.161c0,24.766-20.034,43.454-46.611,43.454h-1.583
                c-26.577,0-46.62-18.688-46.62-43.454v-3.793c0.01-0.057,0.038-0.104,0.038-0.161v-75.852c0-5.243-4.248-9.481-9.482-9.481
                s-9.481,4.238-9.481,9.481v69.367c0,0.057-0.038,0.104-0.038,0.161c0,19.826-16.299,34.769-37.926,34.769
                c-22.556,0-32.228-7.045-38.106-27.146l-3.584-17.92c-8.619-49.474-7.433-99.546,3.375-148.186
                c8.647-29.051,21.542-43.785,38.315-43.785c11.482,0,21.163,7.671,29.601,23.438c1.65,3.081,4.864,5.006,8.363,5.006h9.567
                c5.082,0,9.263-4.001,9.472-9.083c1.1-25.913,22.395-47.806,46.507-47.806h1.583c20.319,0,31.82,17.446,37.888,32.076
                c1.47,3.546,4.93,5.85,8.761,5.85h9.576c5.073,0,9.244-3.992,9.472-9.064c1.138-25.922,22.481-47.825,46.592-47.825h1.394
                c24.121,0,45.454,21.902,46.592,47.825c0.228,5.063,4.399,9.064,9.472,9.064h9.643c3.982,0,7.547-2.494,8.913-6.239
                c7.633-21.03,19.124-31.687,34.133-31.687h8.657c24.993,0,38.903,25.847,43.245,48.005c3.461,18.935,5.935,35.423,7.5,51.124
                c0.009,0.066-0.028,0.133-0.019,0.199c0.853,8.647,1.451,17.01,1.773,25.429c0.009,0.389,0.028,0.778,0.038,1.176
                c0.133,3.764,0.199,7.547,0.228,11.378c0,0.465,0.009,0.91,0.019,1.375C455.301,221.428,455.244,225.297,455.14,229.222z"
          />
        </g>
      </g>
    </svg>
  )
}
