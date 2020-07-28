import React from 'react'
import { Dropdown, Icon, Menu, Segment } from 'semantic-ui-react'

const ReportsMenu = (props) => {
  const {
    openWindowCallback,
    openTabCallback,
  } = props;

  const handleOpenWindow = React.useCallback((value) => {
    openWindowCallback(value);
  }, [openWindowCallback]);

  const handleOpenTab = React.useCallback((value) => {
    openTabCallback(value);
  }, [openTabCallback]);

  return (
    <div>
    <Dropdown
      text='Отчеты'
      icon='unordered list'
      floating
      labeled
      button
      className='icon'
    >
      <Dropdown.Menu>
        <Dropdown.Item>
          <Icon name='dropdown'/>
          <span className='text'>Отчет 1</span>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleOpenTab(1)}>Вкладка</Dropdown.Item>
            <Dropdown.Item onClick={() => handleOpenWindow(1)}>Окно</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Item>
        <Dropdown.Item>
          <Icon name='dropdown'/>
          <span className='text'>Отчет 2</span>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleOpenTab(2)}>Вкладка</Dropdown.Item>
            <Dropdown.Item onClick={() => handleOpenWindow(2)}>Окно</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Item>
        <Dropdown.Item>
          <Icon name='dropdown'/>
          <span className='text'>Отчет 3</span>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleOpenTab(3)}>Вкладка</Dropdown.Item>
            <Dropdown.Item onClick={() => handleOpenWindow(3)}>Окно</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Item>
        <Dropdown.Item>
          <Icon name='dropdown'/>
          <span className='text'>Отчет 4</span>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleOpenTab(4)}>Вкладка</Dropdown.Item>
            <Dropdown.Item onClick={() => handleOpenWindow(4)}>Окно</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Item>
        <Dropdown.Item>
          <Icon name='dropdown'/>
          <span className='text'>Отчет 5</span>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleOpenTab(5)}>Вкладка</Dropdown.Item>
            <Dropdown.Item onClick={() => handleOpenWindow(5)}>Окно</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Item>
        <Dropdown.Item>
          <Icon name='dropdown'/>
          <span className='text'>Отчет 6</span>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleOpenTab(6)}>Вкладка</Dropdown.Item>
            <Dropdown.Item onClick={() => handleOpenWindow(6)}>Окно</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </div>
  )
};

export default React.memo(ReportsMenu);
