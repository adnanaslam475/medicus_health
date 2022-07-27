import React from "react";
import { Input, Button } from "antd";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import _classes from "./SearchFilters.module.scss";

type Props = {
  onChange: (e: string) => void;
};
function OnlySearchFilters({ onChange }: Props) {
  const [searchValue, setSearchValue] = React.useState("");
  function onClear() {
    onChange("");
    setSearchValue("");
  }

  function onChangeFields(searchText: string) {
    setSearchValue(searchText);
    onChange(searchText);
  }

  return (
    <div
      className={`${_classes["page-filters"]} flex-none md:flex items-center mb-5`}
    >
      <span className="text-gray-1 mr-3">Search by</span>

      <div className="lg:ml-3 w-full sm:w-full md:w-full lg:max-w-[430px] mr-2">
        <Input
          placeholder="ID#, patient name or email"
          prefix={<SearchOutlined />}
          value={searchValue}
          onChange={(e) => onChangeFields(e.target.value)}
        />
      </div>

      <div className="flex-none sm:flex">
        <Button
          onClick={onClear}
          type="text"
          className={`${_classes["btn-clear"]} sm:ml-3`}
        >
          <CloseOutlined className="text-sm" />
          <span className="text-gray-1 text-sm">Clear</span>
        </Button>
      </div>
    </div>
  );
}

export default OnlySearchFilters;
