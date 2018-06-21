Connect using Bluetooth
- List services using `chrome://bluetooth-internals`:
  - 00001530-1212-efde-1523-785feabcd123
    - Nordic Device Firmware Update Service? https://github.com/adafruit/Bluefruit_LE_Connect_Android/blob/master/app/src/main/java/com/adafruit/bluefruit/le/connect/ble/KnownUUIDs.java#L38
  - 0000aaaa-0000-1000-8000-00805f9b34fb
  - 0000aadb-0000-1000-8000-00805f9b34fb
  - 0000180f-0000-1000-8000-00805f9b34fb
    - battery_service: https://cs.chromium.org/chromium/src/third_party/blink/renderer/modules/bluetooth/bluetooth_uuid.cc?l=40&rcl=ce3c472e9aa5f8f85e21d013a29d1c291853505c
  - 0000180a-0000-1000-8000-00805f9b34fb
    - device_information
  - How to we request a service? How do we shorten an ID?

- 1.2.3.4.5.6.7.8-3.3.3.3.3.3.3.3-1.2.3.4.5.6.7.8.9.10.11.12-0.0.0.0.6.3.4.3.5.3.4.1

- The corner that moves iff the first digit changes is DRF
- 1: DRF
- 2: URF
- 3: ULF
- 4: DLF
- 5: DRB
- 6: URB
- 7: ULB
- 8: DLB

- 1: DF
- 2: FR
- 3: UF
- 4: FL

Faces:
- U: 4
- L: 3
- F: 6
- R: 5
- B: 1
- D: 2

## References

- <permission.site>
- [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API)
- *Building a Web Bluetooth App* section of <https://medium.com/@urish/start-building-with-web-bluetooth-and-progressive-web-apps-6534835959a6>

## Leads
- https://github.com/GoogleChrome/chrome-app-samples/blob/master/samples/bluetooth-samples/device-info-demo/main.js

## Ideas

- blind
- Look at back stickers only

https://alg.cubing.net/?alg=D%0AF2_R2_U_L2-_U-_L2_B2_F2_D_F2_D-_L_B2_R_U_L2-_D_F-_U_F-_R-%0AD2_B-_U2_B_D-_B-_U2_B_D-_B_U-_B-_D2_B-_U_B_D2_B-_U-_B2_U_B-%0AL-_D2_L_U_L-_D2_L%0AU-%0AF_B-_L_B-_F_U-_F-_B_L2_F-_B_D_B-_F%0AL-_F-_B%0AD-_F_B-_L_B_L-_F_B-_U_B-_U-_F_B-_F_B-_D_F_B-_L_B-_L-_F_B-_U_B_U-_B-_F2_B-%0AB-_L-_B_L-_R_L-_R_F-_L_F_R-_L_R-_L%0AB-_D_U-_D_U-_F_U_F-_D_U-_D_U-_B_U-%0AF_D-_F_B-_L_F2-_L-_F-_B_D_F&title=Giiker%20Cube%20Reconstruction%0A2018-06-17
1:51

https://alg.cubing.net/?alg=R%0AD2_F2_D2_F2_L_F2-_L_R2_U2-_L-_R_U-_R2_U_F-_U-%0AB-_D2_B_L-%0AL_R-_L_R-_D_L_D-_L-_R_L-_R_U_L2-_F-_L_F_B-_U-_F_U_F-_B_U-%0AL_R-_L_R-_D%0AD-_L_R-_L_R-%0AL_R-_F_R_B-_F_D2-_B_F-_R_F-_L-_R%0AB-_F_R_U2_B-_F%0AR2-_B_F-_R-_B_F-%0AU_R_B_F-_U2-_B-_F_R_U-_R_U-_R-_U_R-_L_F-_R_F_L-_F_R-_F-_R_L_R-_F_R_F-_L-_R2_D_R-_U_R_D-_R-_U-_R-_L_U_R2_U-_L-_U_R2_U-_R-_U_R_D2_R-_U-_R_D2_U_L-_U2_R_U-_R-_U2_L_R_U-_R-&title=Giiker%20Cube%20Reconstruction%0A2018-06-17
- Simultaneous cube abd pyra solve
- FMC
- big cube sim controlled using small
  - block selector?
  - foot pedal for 5x5x5
- Measure pauses and count mistakes in a solve
- Don't reset mod 4? e.g.
  - R' R' R' R' == R4'
  - R R R' R R R R R R' == R5
  - U R R' U == U2

- Synchronize button
