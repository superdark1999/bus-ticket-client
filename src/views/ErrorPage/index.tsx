import React from 'react';
import { Button, Result } from 'antd';
import { ROUTER_PATH } from 'routes/routesConfig';

export enum ErrorStatus {
  NOT_FOUND = '404',
  AUTHORIZED = '403',
}
interface SeflProps {
  status: ErrorStatus;
}

const ErrorPage = ({ status }: SeflProps) => (
  <>
    {status === ErrorStatus.NOT_FOUND && (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <>
            <Button
              type="primary"
              onClick={() => {
                window.location.replace(ROUTER_PATH.BOOKING);
              }}
            >
              Homepage
            </Button>
            <Button
              type="primary"
              onClick={() => {
                window.location.replace(ROUTER_PATH.ADMIN);
              }}
            >
              AdminPage
            </Button>
          </>
        }
      />
    )}

    {status === ErrorStatus.AUTHORIZED && (
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button
            type="primary"
            onClick={() => {
              window.location.replace(ROUTER_PATH.BOOKING);
            }}
          >
            Homepage
          </Button>
        }
      />
    )}
  </>
);

export default ErrorPage;
