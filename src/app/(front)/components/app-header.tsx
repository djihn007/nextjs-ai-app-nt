import AppButton from "./app-button";

export default function AppHeader() {
  const isShow = true;
  const students = ['John', 'Mary'];

  return (
    <div>
        <h1 className="text-lg font-bold text-[#423D38]">Hello Header</h1>
        <AppButton />
        <p className="text-sm text-[#797067]">Ecommerce</p>
        {
          students.length > 0 ? <p>Found student data</p> : <p>No data found...</p>
        }
        {
          students.length > 0 && <p>Total students: {students.length}</p>
        }
        {
          isShow && <hr className="my-2 border-[#E3E0DD]" />
        }
    </div>
  );
}
