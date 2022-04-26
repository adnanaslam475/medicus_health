import { Button, Tabs } from 'antd'
import React from 'react'
import AccountsProfile from './AccountsProfile/AccountsProfile';

function Accounts() {
    const { TabPane } = Tabs;
  return (



    
    <div>
      <div className="card-container profile-tabs">
        <Tabs type="card">
          <TabPane
            tab={
              <span className="font-Circular font-medium">
                Profile
              </span>
            }
            key="1"
          >
            <AccountsProfile/>
          </TabPane>
          <TabPane
            tab={
              <span className="font-Circular font-medium">
                Bank Info
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