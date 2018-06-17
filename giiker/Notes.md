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