1.การทำ Pagination
2.การใช้ custom hook
3.การใช้ axios มีการแสดง loading และ error และ แสดงผลลัพธ์
4.การใช้ validtion โดยใช้ form , yub
5.การใช้ prop type
6.การใช้ react query แทน axios
7.การใช้ cancel TOken
8.การใช้ raect router dom, history,goBack() , history.push , .raplace  แทน <Link to/>  ,  history.go(0) //เป็นการ refresh หน้า** , 
9. history.push ใช้กับการเปิดหน้าใหม่
10.// eslint-disable-next-line react-hooks/exhaustive-deps     ลบ warning
11.uploadไฟล์  video ที่18 ค่อยกลับมาดู
12.การใช้ Toast notification
13.การทำ Private Rout
14.การใช้ context api ร่วมกับ local Storage
15.การใช้ redux ร่วมกับ redux persists เหือนเป็นการเก็บ localstorest แต่ไม่ต้อง set ค่าเอง ทำให้ refresh แล้วค่าไม่หาย
16.การ ใช้ redux thunk เพื่อ รองรับ code แบบ asynchonous  จำพวก await asynce ที่ actions

redux setup
1.สร้าง reducer เป็น function return state ธรรมดา  (switch case)
2.สร้าง rootReducer  รวม reducer ทั้งหมด
3.สร้าง store โดย function create store
4.สร้าง Provider ครอบที่ index.js หรือชั้นบนสุด แล้ว  ส่ง store เข้าไป

การใช้งาน
1.get value ด้วย useSelector

import { UserStoreContext } from "../context/UseContext";

  const dataFromRedux = useSelector((state) => state.authState);
  const { profile } = dataFromRedux;

2.change value ด้วย dispatch