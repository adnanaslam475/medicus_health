import { Switch, Divider } from "antd";
function EmailNotification() {
  return (
    <>
      <div className="flex flex-row justify-between items-center py-3">
        <div className="inline-block w-full">
          <div className="flex w-1/2 justify-between">
            <div className="">Patient registration update</div>
          </div>
        </div>
        <div className="text-primary">
          <Switch checked={true} />
        </div>
      </div>
      {/* <Divider className="my-0" /> */}
      <div style={{color: "gray" ,height:"1px" ,width:"100%" ,backgroundColor:"#e5e5e5"}}></div>
      <div className="flex flex-row justify-between items-center py-3">
        <div className="inline-block w-full">
          <div className="flex w-1/2 justify-between">
            <div className="">Physician registration update</div>
          </div>
        </div>
        <div className="text-primary">
          <Switch checked={true} />
        </div>
      </div>
      <div style={{color: "gray" ,height:"1px" ,width:"100%" ,backgroundColor:"#e5e5e5"}}></div>
      <div className="flex flex-row justify-between items-center py-3">
        <div className="inline-block w-full">
          <div className="flex w-1/2 justify-between">
            <div className="">Physician registration update</div>
          </div>
        </div>
        <div className="text-primary">
          <Switch checked={true} />
        </div>
      </div>
      {/* <Divider className="my-0" /> */}
      <div style={{color: "gray" ,height:"1px" ,width:"100%" ,backgroundColor:"#e5e5e5"}}></div>
      <div className="flex flex-row justify-between items-center py-3">
        <div className="inline-block w-full">
          <div className="flex w-1/2 justify-between">
            <div className="">Physician registration update</div>
          </div>
        </div>
        <div className="text-primary">
          <Switch checked={true} />
        </div>
      </div>
    </>
  );
}
export default EmailNotification;
