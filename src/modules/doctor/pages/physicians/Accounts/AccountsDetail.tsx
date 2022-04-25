import { Badge, Button, Tabs } from 'antd'
import Image from 'next/image';
import React from 'react'
import AccountsProfile from './AccountsProfile/AccountsProfile';
import profile from './../../../../../../public/assets/icon/profile.svg'
import { ProfileIcon } from '../../../../../common/components/CustomIcon';

import _classes from './Account.module.scss'
function Accounts() {
    const { TabPane } = Tabs;
  return (



    
    <div>
      <div className="">
        <Tabs >
          <TabPane
            tab={
              <span className="font-Circular font-medium flex">
              <ProfileIcon className={_classes["sidebar-icon-hover"]} />
               <span className="ml-3 text-xs sm:text-base">
                            Profile
                          </span>
              </span>
            }
            key="1"
          >
            <AccountsProfile/>
          </TabPane>
          <TabPane
            tab={
              <span className="font-Circular font-medium">
               
                 <span className="ml-3 text-xs sm:text-base">
                Bank Info
                </span>
              </span>
            }
            key="2"
          >
            <div className="w-3/6">
              {/* <QuestionnaireForm
                ref={form}
                data={data?.patientHealthHistory.history}
                onFinishSuccess={onFinishHealthQuestionnarySuccess}
              /> */}

              <div className="flex items-center justify-end">
                <Button
                  loading={false}
                 
                  className="ant-btn ant-btn-primary ant-btn mb-0"
                  type="primary"
                 
                >
                  Update
                </Button>
              </div>
            </div>
          </TabPane>
          <TabPane
            tab={
              <span className="font-Circular font-medium">Questionnaire</span>
            }
            key="3"
          >
            {/* <PaymentMethods /> */}
          </TabPane>
       
        </Tabs>
      </div>
    </div>
  )
}

export default Accounts