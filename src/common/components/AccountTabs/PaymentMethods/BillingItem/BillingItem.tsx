import React from "react";
import Link from "next/link";

const BillingItem = () => (
  <p>
    <div className="inline-block w-full">
      <div className="flex w-full justify-between">
        <div className="px-3">
          <div className="flex flex-col">
            <div className="text-dark font-bold">Name on Card</div>
            <div className="text-dark ">Natalia Raikova</div>
            <div className="text-red my-3">
              <span>
                <Link href="/">
                  <span className="text-red cursor-pointer">Remove</span>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </p>
);

export default BillingItem;
