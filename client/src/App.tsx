import useTransaction from "./hooks/useTransaction";

function App() {
  const {
    onChangeUserData,
    userData,
    onChangeUIType,
    uiType,
    onProccessTransaction,
  } = useTransaction();

  return (
    <>
      <main
        className="w-screen h-screen flex justify-center py-16"
        data-theme="light"
      >
        <div className="mockup-browser border bg-base-300 shadow">
          <div className="mockup-browser-toolbar">
            <div className="input">
              https://rindevlabs.vercel.id/transcation
            </div>
          </div>
          <div className="px-8 py-16 bg-base-200">
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full mb-5"
              value={userData.name}
              onChange={(even) => onChangeUserData(even, "name")}
            />
            <input
              type="text"
              placeholder="Order ID"
              className="input input-bordered w-full mb-5"
              value={userData.orderId}
              onChange={(even) => onChangeUserData(even, "orderId")}
            />
            <input
              type="number"
              placeholder="Amount"
              className="input input-bordered w-full mb-5"
              value={userData.amount}
              onChange={(even) => onChangeUserData(even, "amount")}
            />
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Midtrans Transaction UI</span>
              </label>
              <select
                className="select select-bordered"
                onChange={onChangeUIType}
                value={uiType}
              >
                <option value="modal">Modal</option>
                <option value="embed">Embed</option>
              </select>
            </div>
            <button
              className="btn btn-primary mt-6 w-full"
              onClick={onProccessTransaction}
            >
              Proccess
            </button>
          </div>

          <div id="snap-container"></div>
        </div>
      </main>
    </>
  );
}

export default App;
