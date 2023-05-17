import Link from 'next/link';
import HeadComponent from '../components/Head/HeadComponent';
import style from './../styles/contacts.module.scss';

const Contacts = () => {
  return (
    <div className={style.contactsContainer}>
      <HeadComponent
        description="Презентация сайта магазина одежды. Контакты магазина"
        viewport="width=device-width, initial-scale=1"
      />
      <span>
        <h3>Контакты</h3>
      </span>
      <span>
        Разместите на этой странице информацию с контактами вашего
        интернет-магазина, а также краткую информацию о нем.
      </span>

      <span>
        <h4>Например:</h4>
      </span>

      <span>----</span>

      <span>Вы можете найти нас по адресу: г.Киев, ул.Барабулица 100</span>

      <span>
        Как добраться: Сокольническая линия метро, последний вагон из центра,
        выход в сторону Казанского вокзала.
      </span>

      <span>Телефон отдела продаж: +38(066) 800-80-81(многоканальный)</span>

      <span>Телефон отдела оптовых продаж: +38(066) 800-80-81</span>

      <span>Email: sales@myshop.ua</span>

      <span>График работы офиса и склада:</span>

      <span>
        Понедельник с 9:00 до 21:00 Вторник с 9:00 до 21:00 Среда с 9:00 до
        21:00 Четверг с 9:00 до 21:00 Пятница с 9:00 до 21:00 Суббота с 10:00 до
        20:00 Воскресенье с 10:00 до 20:00 Заказы через сайт принимаются
        круглосуточно!
      </span>

      <span>Реквизиты:</span>

      <span>ФЛП Иванов Иван Иванович</span>

      <span>ОГРНИП: 123456789012345</span>

      <span>ИНН: 123456789012</span>

      <span>КПП: 123456789</span>

      <span>----</span>

      <span>
        Эту страницу можно отредактировать в бэк-офисе сайта в разделе Меню и
        страницы.
      </span>

      <span>
        Подробнее о создании текстовых страниц и меню, читайте в документации:{' '}
        <Link href="https://google.com">https://google.com</Link>
      </span>
    </div>
  );
};

export default Contacts;
